import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TF_UserRepository } from '../../../core/domain/user.repository';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';
import { TF_User } from '../../../core/models/user.model';
import { TF_RequestResponseMessage } from '../../../shared/types/request-response-message.type';
import { TF_LoginUser } from '../../../shared/types/user/login-user.type';
import { TF_RegisterUser } from '../../../shared/types/user/register-user.type';
import { TF_RequestResponseUserLogin } from '../../../shared/types/user/response-user-login.type';
import { isPlatformBrowser } from '@angular/common';
import {
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
    private userSubject: BehaviorSubject<TF_User | null> =
        new BehaviorSubject<TF_User | null>(null);
    private userSubject$: Observable<TF_User | null> =
        this.userSubject.asObservable();

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private readonly http: HttpClient
    ) {}

    private getRequestInformation = (
        url: TF_ApiUserRouteInput
    ): TF_RequestInformation => {
        const currentUser: TF_User | null = this.getUser();
        const apiUrl: string | null = getAPIRoute(url);

        if (!currentUser || !apiUrl) return null;

        const headers = getHTTPHeader(currentUser.userToken);

        return { httpHeader: headers, apiUrl };
    };

    public registerUser = (
        registerData: TF_RegisterUser
    ): Observable<TF_RequestResponseMessage> => {
        const requestData: TF_RequestInformation =
            this.getRequestInformation('REGISTER_USER');

        if (!requestData) return EMPTY;

        return this.http
            .post<TF_RequestResponseMessage>(
                requestData.apiUrl,
                JSON.stringify(registerData),
                {
                    headers: requestData.httpHeader,
                }
            )
            .pipe(
                tap(() => {
                    this.logoutUser();
                })
            );
    };

    public loginUser = (
        loginData: TF_LoginUser
    ): Observable<TF_RequestResponseUserLogin> => {
        const requestData: TF_RequestInformation =
            this.getRequestInformation('LOGIN_USER');

        if (!requestData) return EMPTY;

        return this.http
            .post<TF_RequestResponseUserLogin>(
                requestData.apiUrl,
                JSON.stringify(requestData),
                { headers: requestData.httpHeader }
            )
            .pipe(
                tap((response: TF_RequestResponseUserLogin) => {
                    this.userSubject.next({
                        userName: loginData.userName,
                        userToken: response.token,
                        userLastLogin: response.lastLogin,
                    });

                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem(
                            KEY_USER_NAME_LOCAL_STORAGE,
                            loginData.userName
                        );
                        localStorage.setItem(
                            KEY_USER_TOKEN_LOCAL_STORAGE,
                            response.token
                        );
                        localStorage.setItem(
                            KEY_USER_LAST_LOGIN_LOCAL_STORAGE,
                            response.lastLogin.toISOString()
                        );
                    }
                })
            );
    };

    public logoutUser = (): boolean => {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
            return true;
        }

        this.userSubject.next(null);
        return false;
    };

    public deleteUser = (
        deleteData: TF_RegisterUser
    ): Observable<TF_RequestResponseMessage> => {
        const requestData: TF_RequestInformation =
            this.getRequestInformation('DELETE_ACCOUNT');

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

    public getIsUserLoggedIn = (): boolean => {
        const currentUser: TF_User | null = this.getUser();

        return currentUser ? true : false;
    };

    public getUser = (): TF_User | null => {
        if (isPlatformBrowser(this.platformId)) {
            const userName: string | null = localStorage.getItem(
                KEY_USER_NAME_LOCAL_STORAGE
            );
            const userToken: string | null = localStorage.getItem(
                KEY_USER_TOKEN_LOCAL_STORAGE
            );
            const userLastLogin: string | null = localStorage.getItem(
                KEY_USER_LAST_LOGIN_LOCAL_STORAGE
            );

            if (
                !userName ||
                !userToken ||
                !userLastLogin ||
                (userName && !userName.trim()) ||
                (userToken && !userToken.trim()) ||
                (userLastLogin && !userLastLogin.trim()) ||
                (userLastLogin &&
                    userLastLogin.trim().length > 0 &&
                    !isNaN(new Date(userLastLogin).getTime()))
            ) {
                return null;
            }

            return {
                userName,
                userToken,
                userLastLogin: new Date(userLastLogin),
            };
        } else {
            return null;
        }
    };

    public getUserSubject = (): Observable<TF_User | null> => {
        return this.userSubject$;
    };
}
