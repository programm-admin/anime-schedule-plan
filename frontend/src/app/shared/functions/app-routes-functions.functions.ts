import { APP_ROUTES } from '../constants/app-routes';
import { TF_AppRoute, TF_AppRoutePresentation } from '../types/app-route.type';

export const getAllAppRoutes = (): TF_AppRoutePresentation[] =>
    Object.values(APP_ROUTES).map((route: TF_AppRoute) => ({
        name: route.name,
        url: route.url,
    }));

export const getVisibleAppRoutes = (): TF_AppRoutePresentation[] =>
    Object.values(APP_ROUTES)
        .filter((route: TF_AppRoute) => route.isVisible)
        .map((route: TF_AppRoute) => ({
            name: route.name,
            url: route.url,
        }));
