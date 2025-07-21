import { TF_RegisterUser } from '../../shared/types/user/register-user.type';
import { TF_RequestResponseMessage } from '../../shared/types/request-response-message.type';
import { TF_LoginUser } from '../../shared/types/user/login-user.type';
import { TF_RequestResponseUserLogin } from '../../shared/types/user/response-user-login.type';
import { TF_User, TF_UserFull } from '../models/user.model';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export type TF_UserRepository = {
    // TF = Type Frontend
    // functions
    registerUser: (
        registerData: TF_RegisterUser
    ) => Observable<TF_RequestResponseMessage>;
    loginUser: (
        loginData: TF_LoginUser
    ) => Observable<TF_RequestResponseUserLogin>;
    deleteUser: (
        deleteData: TF_RegisterUser
    ) => Observable<TF_RequestResponseMessage>;
    getIsUserLoggedIn: () => Observable<boolean>;
    getUser: () => TF_UserFull;
    getUserSubject: () => Observable<TF_UserFull>;
    setUserSubject: (data: TF_User) => void;
    logoutUser: () => boolean;
};

export const IT_USER_REPOSITORY = new InjectionToken<TF_UserRepository>(
    'T_UserRepository'
);
