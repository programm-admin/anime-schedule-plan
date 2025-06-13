import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { IAUTH_REPOSITORY_TOKEN } from './core/services/auth-repository.interface';
import { AuthApiService } from './infrastructure/auth-api/auth-api.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        {
            provide: IAUTH_REPOSITORY_TOKEN,
            useClass: AuthApiService,
        },
    ],
};
