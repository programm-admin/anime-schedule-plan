import { TF_AppRoute } from '../types/app-route.type';

export const APP_ROUTES: { [key: string]: TF_AppRoute } = {
    START: { name: 'Startseite', url: '', isVisible: false },
    USER_REGISTER: {
        name: 'Nutzer registrieren',
        url: 'register',
        isVisible: true,
    },
    USER_LOGIN: { name: 'Einloggen', url: 'login', isVisible: true },
};
