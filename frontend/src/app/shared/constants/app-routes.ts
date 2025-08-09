import { TF_AppRoute } from '../types/app-route.type';

export const APP_ROUTES: { [key: string]: TF_AppRoute } = {
    START: { name: 'Startseite', url: '', isVisible: false },
    USER_REGISTER: {
        name: 'Nutzer registrieren',
        url: 'register',
        isVisible: true,
    },
    USER_LOGIN: { name: 'Einloggen', url: 'login', isVisible: true },
    USER_START: { name: 'Meine Startseite', url: 'user', isVisible: true },
    MOVIE: { name: 'Meine Filme', url: 'movie', isVisible: true },
    CREATE_MOVIE: {
        name: 'Film anlegen',
        url: 'create',
        isVisible: true,
    },
    CREATE_MOVIE_SERIES: {
        name: 'Filmreihe anlegen',
        url: 'create',
        isVisible: true,
    },
};
