import { Component, OnInit } from '@angular/core';
import { UC_User_GetUserSubject } from '../../../core/use-cases/user/get-user-subject.use-case';
import { TF_UserFull } from '../../../core/models/user.model';
import { COMPBase } from '../../_components/comp-base/comp-base';
import { takeUntil } from 'rxjs';
import { DEFAULT_FULL_USER } from '../../../shared/constants/default-full-user';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-start-page.component',
    imports: [ProgressSpinner, ButtonModule],
    templateUrl: './start-page.component.html',
    styleUrl: './start-page.component.scss',
    providers: [UC_User_GetUserSubject],
})
export class StartPageComponent extends COMPBase implements OnInit {
    public user: TF_UserFull = DEFAULT_FULL_USER;

    constructor(public readonly getUserSubjectUseCase: UC_User_GetUserSubject) {
        super();
    }

    ngOnInit(): void {
        this.getUserSubjectUseCase
            .execute()
            .pipe(takeUntil(this.destroy$))
            .subscribe((userSubject: TF_UserFull) => {
                this.user = userSubject;
            });
    }
}
