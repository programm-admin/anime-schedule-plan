import { Injectable } from '@angular/core';
import { TF_NavigationRepository } from '../../../core/domain/navigation.repository';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class INFREP_Navigation implements TF_NavigationRepository {
    constructor(private router: Router) {}

    public navigateToStartPage = () => {
        this.router.navigateByUrl('');
    };

    public navigateToPage = (url: string) => {
        this.router.navigateByUrl(url);
    };
}
