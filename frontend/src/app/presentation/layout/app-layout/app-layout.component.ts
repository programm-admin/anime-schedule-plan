import { Component, OnInit } from '@angular/core';
import { HeaderMainComponent } from '../../_components/header/header-main/header-main.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { COMPBase } from '../../_components/comp-base/comp-base';
import { CommonModule } from '@angular/common';
import { UC_Navigation_GetRouterEvents } from '../../../core/use-cases/navigation/get-router-events.use-case';
import { UC_Navigation_NavigateToStartPage } from '../../../core/use-cases/navigation/navigate-to-start-page.use-case';

@Component({
    selector: 'app-app-layout',
    imports: [HeaderMainComponent, RouterOutlet, CommonModule],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.scss',
    providers: [
        UC_Navigation_GetRouterEvents,
        UC_Navigation_NavigateToStartPage,
    ],
})
export class AppLayoutComponent extends COMPBase implements OnInit {
    public isUrlForBigPicture: boolean = true;

    constructor(
        private readonly getRouterEventsUseCase: UC_Navigation_GetRouterEvents,
        private readonly navigateToStartPageUseCase: UC_Navigation_NavigateToStartPage
    ) {
        super();
    }

    ngOnInit(): void {
        this.getRouterEventsUseCase
            .execute()
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => {
                this.isUrlForBigPicture =
                    event.urlAfterRedirects.trim() === '/';
            });
    }

    public navigateToStartPage = () => {
        this.navigateToStartPageUseCase.execute();
    };
}
