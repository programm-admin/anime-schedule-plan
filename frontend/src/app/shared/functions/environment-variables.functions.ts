import { HttpHeaders } from '@angular/common/http';
import { TF_ApiUserRouteInput } from '../types/api-route-input.type';
import { ENVIRONMENT_VARIABLES } from '../../../../environment';

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

    return `${
        ENVIRONMENT_VARIABLES.API_URL
    }${splittedRoute[0].toLowerCase()}/${splittedRoute[1].toLowerCase()}`;
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
