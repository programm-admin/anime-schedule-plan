import { Component, OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { UC_User_GetUserSubject } from '../../../../core/use-cases/user/get-user-subject.use-case';
import { TF_User } from '../../../../core/models/user.model';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../shared/constants/app-routes';

@Component({
    selector: 'app-header-main',
    imports: [TooltipModule, Menu],
    templateUrl: './header-main.component.html',
    styleUrl: './header-main.component.scss',
    providers: [UC_User_GetUserSubject],
})
export class HeaderMainComponent implements OnInit {
    public isUserLoggedIn: boolean = false;
    public menuItems: MenuItem[] | undefined;

    constructor(
        private getUserSubjectUseCase: UC_User_GetUserSubject,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getUserSubjectUseCase
            .execute()
            .subscribe((userSubject: TF_User | null) => {
                this.isUserLoggedIn = userSubject !== null;
            });

        this.menuItems = [
            {
                label: APP_ROUTES['USER_REGISTER'].name,
                command: () =>
                    this.navigateToPage(APP_ROUTES['USER_REGISTER'].url),
                icon: 'pi pi-user-plus',
            },
            {
                label: APP_ROUTES['USER_LOGIN'].name,
                command: () =>
                    this.navigateToPage(APP_ROUTES['USER_LOGIN'].url),
                icon: 'pi pi-sign-in',
            },
        ];
    }

    private navigateToPage = (pageUrl: string) => {
        this.router.navigateByUrl(`/${pageUrl}`);
    };
}
