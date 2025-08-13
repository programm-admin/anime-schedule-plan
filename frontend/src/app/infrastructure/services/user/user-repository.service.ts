import { computed, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TF_UserRepository } from '../../../core/domain/user.repository';
import { BehaviorSubject, EMPTY, map, Observable, tap } from 'rxjs';
import { TF_User, TF_UserFull } from '../../../core/models/user.model';
import { TF_RequestResponseMessage } from '../../../shared/types/request-response-message.type';
import { TF_LoginUser } from '../../../shared/types/user/login-user.type';
import { TF_RegisterUser } from '../../../shared/types/user/register-user.type';
import { TF_RequestResponseUserLogin } from '../../../shared/types/user/response-user-login.type';
import { isPlatformBrowser } from '@angular/common';
import {
    KEY_USER_ACCOUNT_ID,
    KEY_USER_LAST_LOGIN_LOCAL_STORAGE,
    KEY_USER_NAME_LOCAL_STORAGE,
    KEY_USER_TOKEN_LOCAL_STORAGE,
} from '../../../shared/constants/local-storage.constant';
import {
    getAPIRoute,
    getHTTPHeader,
} from '../../../shared/functions/environment-variables.functions';
import { HttpClient } from '@angular/common/http';
import {
    TF_ApiUserRouteInput,
    TF_RequestInformation,
} from '../../../shared/types/api-route-input.type';

@Injectable({
    providedIn: 'root',
})
export class INFREP_User implements TF_UserRepository {
    // INFREP = infrastructure repository
    // variables
    private userSubject!: BehaviorSubject<TF_UserFull>;
    private userSubject$!: Observable<TF_UserFull>;

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<TF_UserFull>({
            user: null,
            status: isPlatformBrowser(this.platformId) ? 'loading' : 'server',
        });
        this.userSubject$ = this.userSubject.asObservable();

        if (isPlatformBrowser(this.platformId)) {
            this.userSubject.next(this.getUser());
        }
    }

    private getRequestInformation = (
        url: TF_ApiUserRouteInput,
        withAuthorization: boolean
    ): TF_RequestInformation => {
        if (withAuthorization) {
            const currentUser: TF_UserFull = this.getUser();
            const apiUrl: string | null = getAPIRoute(url);

            if (!currentUser.user || !apiUrl) return null;

            const headers = getHTTPHeader(currentUser.user.userToken, true);

            return { httpHeader: headers, apiUrl };
        } else {
            // without token -> user is not necessary
            const apiUrl: string | null = getAPIRoute(url);

            if (!apiUrl) return null;

            const headers = getHTTPHeader('', false);

            return { httpHeader: headers, apiUrl };
        }
    };

    public registerUser = (
        registerData: TF_RegisterUser
    ): Observable<TF_RequestResponseMessage> => {
        const requestData: TF_RequestInformation = this.getRequestInformation(
            'USER-REGISTER',
            false
        );

        if (!requestData) return EMPTY;

        return this.http
            .post<TF_RequestResponseMessage>(requestData.apiUrl, registerData, {
                headers: requestData.httpHeader,
            })
            .pipe(
                tap(() => {
                    this.logoutUser();
                })
            );
    };

    public loginUser = (
        loginData: TF_LoginUser
    ): Observable<TF_RequestResponseUserLogin> => {
        const requestData: TF_RequestInformation = this.getRequestInformation(
            'USER-LOGIN',
            false
        );

        if (!requestData) return EMPTY;

        return this.http.post<TF_RequestResponseUserLogin>(
            requestData.apiUrl,
            loginData,
            {
                headers: requestData.httpHeader,
            }
        );
    };

    public logoutUser = (): boolean => {
        this.userSubject.next({ user: null, status: 'loading' });

        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
            this.userSubject.next({ user: null, status: 'finished' });
            return true;
        }

        this.userSubject.next({ user: null, status: 'finished' });
        return false;
    };

    public deleteUser = (
        deleteData: TF_RegisterUser
    ): Observable<TF_RequestResponseMessage> => {
        const requestData: TF_RequestInformation = this.getRequestInformation(
            'USER-DELETE',
            true
        );

        if (!requestData) return EMPTY;

        return this.http
            .delete<TF_RequestResponseMessage>(requestData.apiUrl, {
                body: JSON.stringify(deleteData),
                headers: requestData.httpHeader,
            })
            .pipe(
                tap(() => {
                    this.logoutUser();
                })
            );
    };

    public getIsUserLoggedIn = (): Observable<boolean> => {
        return this.userSubject.pipe(
            map(
                (currentUser: TF_UserFull) =>
                    currentUser.user !== null &&
                    currentUser.status === 'finished'
            )
        );
    };

    public getUser = (): TF_UserFull => {
        if (isPlatformBrowser(this.platformId)) {
            const userName: string | null = localStorage.getItem(
                KEY_USER_NAME_LOCAL_STORAGE
            );
            const userToken: string | null = localStorage.getItem(
                KEY_USER_TOKEN_LOCAL_STORAGE
            );
            const userAccountId: string | null =
                localStorage.getItem(KEY_USER_ACCOUNT_ID);
            const userLastLogin: string | null = localStorage.getItem(
                KEY_USER_LAST_LOGIN_LOCAL_STORAGE
            );

            if (
                !userName ||
                !userToken ||
                !userAccountId ||
                !userLastLogin ||
                (userName && !userName.trim()) ||
                (userToken && !userToken.trim()) ||
                (userAccountId && !userAccountId.trim()) ||
                (userLastLogin && !userLastLogin.trim()) ||
                (userLastLogin &&
                    userLastLogin.trim().length > 0 &&
                    isNaN(new Date(userLastLogin).getTime()))
            ) {
                return { user: null, status: 'finished' };
            }

            return {
                user: {
                    userName,
                    userToken,
                    userAccountId,
                    userLastLogin: new Date(userLastLogin),
                },
                status: 'finished',
            };
        } else {
            return { user: null, status: 'finished' };
        }
    };

    public getUserSubject = (): Observable<TF_UserFull> => {
        return this.userSubject$;
    };

    public setUserSubject = (data: TF_User) => {
        this.userSubject.next({ user: data, status: 'finished' });
    };
}
