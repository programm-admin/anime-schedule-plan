import { Inject, Injectable } from '@angular/core';
import {
    IT_NAVIGATION_REPOSITORY,
    TF_NavigationRepository,
} from '../../domain/navigation.repository';
import { Observable } from 'rxjs';
import { Event } from '@angular/router';

@Injectable()
export class UC_Navigation_GetRouterEvents {
    constructor(
        @Inject(IT_NAVIGATION_REPOSITORY)
        private readonly navigationRepository: TF_NavigationRepository,
    ) {}

    public execute = (): Observable<Event> => {
        return this.navigationRepository.getRouterEvents();
    };
}
