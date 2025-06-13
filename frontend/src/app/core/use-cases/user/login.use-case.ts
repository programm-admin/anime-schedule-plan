import { Inject, Injectable } from '@angular/core';
import {
    IAUTH_REPOSITORY_TOKEN,
    IAuthRepository,
} from '../../services/auth-repository.interface';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UCLogin {
    constructor(
        @Inject(IAUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository
    ) {}

    public execute = (
        userName: string,
        password: string
    ): Observable<IUser> => {
        return this.authRepository.login(userName, password);
    };
}
