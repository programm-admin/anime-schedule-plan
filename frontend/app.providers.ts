import { Provider } from '@angular/core';
import { IT_USER_REPOSITORY } from './src/app/core/domain/user.repository';
import { INFREP_User } from './src/app/infrastructure/services/user/user-repository.service';
import { IT_MESSAGE_REPOSITORY } from './src/app/core/domain/message.repository';
import { INFREP_Message } from './src/app/infrastructure/services/message/message-repository';
import { IT_LOCAL_STORAGE_REPOSITORY } from './src/app/core/domain/local-storage.repository';
import { INFREP_LocalStorage } from './src/app/infrastructure/services/local-storage/local-storage-repository';
import { IT_NAVIGATION_REPOSITORY } from './src/app/core/domain/navigation.repository';
import { INFREP_Navigation } from './src/app/infrastructure/services/navigation/navigation-repository';
import { IT_MOVIE_REPOSITORY } from './src/app/core/domain/movie.repository';
import { INFREP_Movie } from './src/app/infrastructure/services/movie/movie-repository';

export const getProviders = (): Provider[] => {
    return [
        { provide: IT_USER_REPOSITORY, useClass: INFREP_User },
        { provide: IT_MESSAGE_REPOSITORY, useClass: INFREP_Message },
        { provide: IT_LOCAL_STORAGE_REPOSITORY, useClass: INFREP_LocalStorage },
        { provide: IT_NAVIGATION_REPOSITORY, useClass: INFREP_Navigation },
        { provide: IT_MOVIE_REPOSITORY, useClass: INFREP_Movie },
    ];
};
