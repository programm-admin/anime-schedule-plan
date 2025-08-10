import { InjectionToken } from '@angular/core';

export type TF_NavigationRepository = {
    navigateToStartPage: () => void;
    navigateToPage: (url: string) => void;
};

export const IT_NAVIGATION_REPOSITORY =
    new InjectionToken<TF_NavigationRepository>('TF_NavigationRepository');
