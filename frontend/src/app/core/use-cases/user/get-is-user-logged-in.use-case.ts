import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UC_User_GetIsUserLoggedIn {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository,
    ) {}

    public execute = (): Observable<boolean> => {
        return this.userRepository.getIsUserLoggedIn();
    };
}
