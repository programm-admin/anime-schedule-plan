import { Inject, Injectable } from '@angular/core';
import {
    IT_NAVIGATION_REPOSITORY,
    TF_NavigationRepository,
} from '../../domain/navigation.repository';

@Injectable()
export class UC_Navigation_NavigateToStartPage {
    constructor(
        @Inject(IT_NAVIGATION_REPOSITORY)
        private readonly navigationRepository: TF_NavigationRepository,
    ) {}

    public execute = () => {
        return this.navigationRepository.navigateToStartPage();
    };
}
