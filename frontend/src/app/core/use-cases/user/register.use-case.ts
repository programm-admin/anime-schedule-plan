import { Inject, Injectable } from '@angular/core';
import { IAUTH_REPOSITORY_TOKEN, IAuthRepository } from '../../services/auth-repository.interface';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UCRegister {
    constructor(
        @Inject(IAUTH_REPOSITORY_TOKEN) private authRepository: IAuthRepository
    ) {}

    execute(email: string, password: string): Observable<void> {
        return this.authRepository.register(email, password);
    }
}
