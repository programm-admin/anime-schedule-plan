import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';

@Injectable()
export class UC_User_GetIsUserLoggedIn {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository
    ) {}

    public execute = (): boolean => {
        return this.userRepository.getIsUserLoggedIn();
    };
}
