import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppLayoutComponent } from './presentation/layout/app-layout/app-layout.component';

@Component({
    selector: 'app-root',
    imports: [ButtonModule, AppLayoutComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'anime-schedule-plan-frontend';
}
