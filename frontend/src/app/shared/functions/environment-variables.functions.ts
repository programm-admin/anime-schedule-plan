import { HttpHeaders } from '@angular/common/http';
import { TF_ApiUserRouteInput } from '../types/api-route-input.type';

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
    const apiKey = process.env['API_KEY'];

    if (!apiKey) return null;

    return `${apiKey}/${routeString.toLocaleLowerCase()}`;
};

export const getHTTPHeader = (token: string): HttpHeaders => {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
    });
};
