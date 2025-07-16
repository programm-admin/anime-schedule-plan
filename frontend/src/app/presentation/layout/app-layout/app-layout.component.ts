import { Component } from '@angular/core';
import { HeaderMainComponent } from '../../_components/header/header-main/header-main.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-app-layout',
    imports: [HeaderMainComponent, RouterOutlet],
    templateUrl: './app-layout.component.html',
    styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {}
