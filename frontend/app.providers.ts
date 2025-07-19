import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './src/app/core/domain/user.repository';
import { INFREP_User } from './src/app/infrastructure/services/user/user-repository.service';
import { IT_MESSAGE_REPOSITORY } from './src/app/core/domain/message.repository';
import { INFREP_Message } from './src/app/infrastructure/services/message/message-repository';

export const getProviders = (): Provider[] => {
    return [
        { provide: IT_USER_REPOSITORY, useClass: INFREP_User },
        { provide: IT_MESSAGE_REPOSITORY, useClass: INFREP_Message },
    ];
};
