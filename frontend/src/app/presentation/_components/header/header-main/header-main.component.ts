import { Component, OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { UC_User_GetUserSubject } from '../../../../core/use-cases/user/get-user-subject.use-case';
import { TF_UserFull } from '../../../../core/models/user.model';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../shared/constants/app-routes';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { COMPBase } from '../../comp-base/comp-base';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-header-main',
    imports: [TooltipModule, Menu, CommonModule, ProgressSpinnerModule],
    templateUrl: './header-main.component.html',
    styleUrl: './header-main.component.scss',
    providers: [UC_User_GetUserSubject],
})
export class HeaderMainComponent extends COMPBase implements OnInit {
    public isUserLoggedIn: boolean = false;
    public menuItems: MenuItem[] | undefined;
    public createMenuItems: MenuItem[] | undefined;
    public isUserLoading: boolean = false;

    constructor(
        private readonly getUserSubjectUseCase: UC_User_GetUserSubject,
        private readonly router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.getUserSubjectUseCase
            .execute()
            .pipe(takeUntil(this.destroy$))
            .subscribe((userSubject: TF_UserFull) => {
                this.isUserLoggedIn = userSubject.user !== null;
                this.isUserLoading =
                    userSubject.status === 'loading' ||
                    userSubject.status === 'server';
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
        this.createMenuItems = [
            {
                label: APP_ROUTES['CREATE_MOVIE'].name,
                command: () =>
                    this.navigateToPage(APP_ROUTES['CREATE_MOVIE'].url),
            },
            {
                label: APP_ROUTES['CREATE_MOVIE_SERIES'].name,
                command: () =>
                    this.navigateToPage(APP_ROUTES['CREATE_MOVIE_SERIES'].url),
            },
        ];
    }

    private navigateToPage = (pageUrl: string) => {
        this.router.navigateByUrl(`/${pageUrl}`);
    };
}
