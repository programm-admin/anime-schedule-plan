import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { InjectionToken } from '@angular/core';

export const IAUTH_REPOSITORY_TOKEN = new InjectionToken<IAuthRepository>(
    'IAuthRepository'
);

export interface IAuthRepository {
    login(userName: string, password: string): Observable<IUser>;
    register(userName: string, password: string): Observable<void>;
    logout(): void;
    deleteAccount(userName: string, password: string): Observable<void>;
}
