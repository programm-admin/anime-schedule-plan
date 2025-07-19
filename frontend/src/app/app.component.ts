import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppLayoutComponent } from './presentation/layout/app-layout/app-layout.component';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [ButtonModule, AppLayoutComponent, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [],
})
export class AppComponent {
    title = 'anime-schedule-plan-frontend';

    constructor() {}
}
