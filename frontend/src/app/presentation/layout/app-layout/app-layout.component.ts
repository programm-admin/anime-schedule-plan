import { Component, OnInit } from '@angular/core';
import { HeaderMainComponent } from '../../_components/header/header-main/header-main.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { COMPBase } from '../../_components/comp-base/comp-base';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-app-layout',
    imports: [HeaderMainComponent, RouterOutlet, CommonModule],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent extends COMPBase implements OnInit {
    public isUrlForBigPicture: boolean = true;

    constructor(private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => {
                this.isUrlForBigPicture =
                    event.urlAfterRedirects.trim() === '/';
            });
    }


}
