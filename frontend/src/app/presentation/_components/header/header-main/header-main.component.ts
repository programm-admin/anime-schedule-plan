import { Component, OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { UC_User_GetUserSubject } from '../../../../core/use-cases/user/get-user-subject.use-case';
import { TF_User } from '../../../../core/models/user.model';

@Component({
    selector: 'app-header-main',
    imports: [TooltipModule],
    templateUrl: './header-main.component.html',
    styleUrl: './header-main.component.scss',
    providers: [UC_User_GetUserSubject],
})
export class HeaderMainComponent implements OnInit {
    public isUserLoggedIn: boolean = false;

    constructor(private getUserSubjectUseCase: UC_User_GetUserSubject) {}

    ngOnInit(): void {
        this.getUserSubjectUseCase
            .execute()
            .subscribe((userSubject: TF_User | null) => {
                this.isUserLoggedIn = userSubject !== null;
            });
    }
}
