import { Injectable } from '@angular/core';
import { TF_NavigationRepository } from '../../../core/domain/navigation.repository';
import { ActivatedRoute, Event, ParamMap, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class INFREP_Navigation implements TF_NavigationRepository {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    public navigateToStartPage = () => {
        this.router.navigateByUrl('');
    };

    public navigateToPage = (url: string) => {
        this.router.navigateByUrl(url);
    };

    public getRouterEvents = (): Observable<Event> => {
        return this.router.events;
    };
}
