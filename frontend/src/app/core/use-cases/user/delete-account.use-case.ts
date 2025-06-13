import { Inject, Injectable } from '@angular/core';
import {
    IAUTH_REPOSITORY_TOKEN,
    IAuthRepository,
} from '../../services/auth-repository.interface';

@Injectable({ providedIn: 'root' })
export class UCDelete {
    constructor(
        @Inject(IAUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository
    ) {}

    public execute = (userName: string, password: string): void => {
        this.authRepository.deleteAccount(userName, password);
    };
}
