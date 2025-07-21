import { HttpHeaders } from '@angular/common/http';

export type TF_ApiUserRouteInput =
    | 'USER-REGISTER'
    | 'USER-LOGIN'
    | 'USER-DELETE';

export type TF_RequestInformation = {
    httpHeader: HttpHeaders;
    apiUrl: string;
} | null;
