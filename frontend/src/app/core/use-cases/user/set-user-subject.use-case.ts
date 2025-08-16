import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';
import { TF_User } from '../../models/user.model';

@Injectable()
export class UC_User_SetUserSubject {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository
    ) {}

    public execute = (data: TF_User) => {
        return this.userRepository.setUserSubject(data);
    };
}
