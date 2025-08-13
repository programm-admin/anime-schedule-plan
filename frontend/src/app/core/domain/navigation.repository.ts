import { InjectionToken } from '@angular/core';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';

export type TF_NavigationRepository = {
    navigateToStartPage: () => void;
    navigateToPage: (url: string) => void;
    getRouterEvents: () => Observable<Event>;
};

export const IT_NAVIGATION_REPOSITORY =
    new InjectionToken<TF_NavigationRepository>('TF_NavigationRepository');
