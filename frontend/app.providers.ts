import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './src/app/core/domain/user.repository';
import { INFREP_User } from './src/app/infrastructure/services/user/user-repository.service';

export const getProviders = (): Provider[] => {
    return [{ provide: IT_USER_REPOSITORY, useClass: INFREP_User }];
};
