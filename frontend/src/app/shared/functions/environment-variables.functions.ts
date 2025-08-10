import { HttpHeaders } from '@angular/common/http';
import {
    TF_ApiUserRouteInput,
    TF_RequestInformation,
} from '../types/api-route-input.type';
import { ENVIRONMENT_VARIABLES } from '../../../../environment';
import { TF_UserFull } from '../../core/models/user.model';
import {
    KEY_USER_ACCOUNT_ID,
    KEY_USER_LAST_LOGIN_LOCAL_STORAGE,
    KEY_USER_NAME_LOCAL_STORAGE,
    KEY_USER_TOKEN_LOCAL_STORAGE,
} from '../constants/local-storage.constant';

/**
 * Function for getting the api key for the backend from the environment variables.
 * @returns string | undefined
 */
export const getAPIKey = (): string | undefined => {
    const apiKey = process.env['API_KEY'];

    return apiKey;
};

export const getAPIRoute = (
    routeString: TF_ApiUserRouteInput
): string | null => {
    console.log('[get api route] env', ENVIRONMENT_VARIABLES.API_URL.trim());
    if (!ENVIRONMENT_VARIABLES.API_URL.trim()) return null;

    const splittedRoute: string[] = routeString.split('-');

    if (splittedRoute.length < 2) return null;

    const finalRoute: string = `${
        ENVIRONMENT_VARIABLES.API_URL
    }${splittedRoute[0]
        .replace(/_/g, '-')
        .toLowerCase()}/${splittedRoute[1].toLowerCase()}`;

    return finalRoute;
};

export const getHTTPHeader = (
    token: string,
    withToken: boolean
): HttpHeaders => {
    const headers = new HttpHeaders(
        withToken
            ? {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer: ${token}`,
              }
            : {
                  'Content-Type': 'application/json',
              }
    );

    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
    });
};

export const getUser = (): TF_UserFull => {
    const userName: string | null = localStorage.getItem(
        KEY_USER_NAME_LOCAL_STORAGE
    );
    const userToken: string | null = localStorage.getItem(
        KEY_USER_TOKEN_LOCAL_STORAGE
    );
    const userAccountId: string | null =
        localStorage.getItem(KEY_USER_ACCOUNT_ID);
    const userLastLogin: string | null = localStorage.getItem(
        KEY_USER_LAST_LOGIN_LOCAL_STORAGE
    );

    if (
        !userName ||
        !userToken ||
        !userAccountId ||
        !userLastLogin ||
        (userName && !userName.trim()) ||
        (userToken && !userToken.trim()) ||
        (userAccountId && !userAccountId.trim()) ||
        (userLastLogin && !userLastLogin.trim()) ||
        (userLastLogin &&
            userLastLogin.trim().length > 0 &&
            isNaN(new Date(userLastLogin).getTime()))
    ) {
        return { user: null, status: 'finished' };
    }

    return {
        user: {
            userName,
            userToken,
            userAccountId,
            userLastLogin: new Date(userLastLogin),
        },
        status: 'finished',
    };
};

export const getRequestInformation = (
    url: TF_ApiUserRouteInput,
    withAuthorization: boolean
): TF_RequestInformation => {
    if (withAuthorization) {
        const currentUser: TF_UserFull = getUser();
        const apiUrl: string | null = getAPIRoute(url);

        if (!currentUser.user || !apiUrl) return null;

        const headers = getHTTPHeader(currentUser.user.userToken, true);

        return { httpHeader: headers, apiUrl };
    } else {
        // without token -> user is not necessary
        const apiUrl: string | null = getAPIRoute(url);

        if (!apiUrl) return null;

        const headers = getHTTPHeader('', false);

        return { httpHeader: headers, apiUrl };
    }
};
