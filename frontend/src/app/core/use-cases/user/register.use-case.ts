import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';
import { TF_RegisterUser } from '../../../shared/types/user/register-user.type';
import { TF_RequestResponseMessage } from '../../../shared/types/request-response-message.type';
import { Observable } from 'rxjs';

@Injectable()
export class UC_User_RegisterUser {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository
    ) {}

    public execute = (
        registerData: TF_RegisterUser
    ): Observable<TF_RequestResponseMessage> => {
        return this.userRepository.registerUser(registerData);
    };
}
