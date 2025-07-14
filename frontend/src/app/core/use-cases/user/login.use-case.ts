import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';
import { TF_LoginUser } from '../../../shared/types/user/login-user.type';
import { TF_RequestResponseUserLogin } from '../../../shared/types/user/response-user-login.type';
import { Observable } from 'rxjs';

@Injectable()
export class UC_User_LoginUser {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository
    ) {}

    public execute = (
        loginData: TF_LoginUser
    ): Observable<TF_RequestResponseUserLogin> => {
        return this.userRepository.loginUser(loginData);
    };
}
