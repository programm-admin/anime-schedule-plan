import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderMainComponent } from './presentation/_components/header/header-main/header-main.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderMainComponent, ButtonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'anime-schedule-plan-frontend';
}
