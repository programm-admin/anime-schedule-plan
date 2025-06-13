/**
 * Function for getting the api key for the backend from the environment variables.
 * @returns string | undefined
 */
export const getAPIKey = (): string | undefined => {
    const apiKey = process.env['API_KEY'];

    return apiKey;
};

export const LOCAL_STORAGE_KEYS = {
    USER_NAME: 'userName',
    USER_TOKEN: 'userToken',
};
