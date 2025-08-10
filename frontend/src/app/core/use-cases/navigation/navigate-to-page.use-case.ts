import { Inject, Injectable } from '@angular/core';
import {
    IT_NAVIGATION_REPOSITORY,
    TF_NavigationRepository,
} from '../../domain/navigation.repository';

@Injectable()
export class UC_Navigation_NavigateToPage {
    constructor(
        @Inject(IT_NAVIGATION_REPOSITORY)
        private readonly navigationRepository: TF_NavigationRepository
    ) {}

    public execute = (url: string) => {
        return this.navigationRepository.navigateToPage(url);
    };
}
