import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IAuthRepository } from '../../core/services/auth-repository.interface';
import { EMPTY, Observable, tap } from 'rxjs';
import { IUser } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { getAPIKey, LOCAL_STORAGE_KEYS } from '../helper-functions';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService implements IAuthRepository {
    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public login = (userName: string, password: string): Observable<IUser> => {
        const apiKey: string | undefined = getAPIKey();

        if (!apiKey) {
            return EMPTY;
        }

        return this.http
            .post<IUser>(
                apiKey + 'login',
                JSON.stringify({ userName, password })
            )
            .pipe(
                tap((user: IUser) => {
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem(
                            LOCAL_STORAGE_KEYS.USER_NAME,
                            user.userName
                        );
                        localStorage.setItem(
                            LOCAL_STORAGE_KEYS.USER_TOKEN,
                            user.userToken
                        );
                    }
                })
            );
    };

    public register = (
        userName: string,
        password: string
    ): Observable<void> => {
        const apiKey: string | undefined = getAPIKey();

        if (!apiKey) {
            return EMPTY;
        }

        return this.http.post<void>(
            apiKey + 'register',
            JSON.stringify({ userName, password })
        );
    };

    public logout = (): void => {
        const apiKey: string | undefined = getAPIKey();

        if (!apiKey) {
            return;
        }

        if (isPlatformBrowser(this.platformId)) localStorage.clear();
    };

    public deleteAccount = (
        userName: string,
        password: string
    ): Observable<void> => {
        const apiKey: string | undefined = getAPIKey();

        if (!apiKey) {
            return EMPTY;
        }

        return this.http.delete<void>(apiKey + 'delete-user', {
            body: JSON.stringify({ userName, password }),
        });
    };
}
