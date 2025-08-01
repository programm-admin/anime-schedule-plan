import { Inject, Injectable } from '@angular/core';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../domain/user.repository';
import { Observable } from 'rxjs';
import { TF_UserFull } from '../../models/user.model';

@Injectable()
export class UC_User_GetUserSubject {
    constructor(
        @Inject(IT_USER_REPOSITORY)
        private readonly userRepository: TF_UserRepository
    ) {}

    public execute = (): Observable<TF_UserFull> => {
        return this.userRepository.getUserSubject();
    };
}
