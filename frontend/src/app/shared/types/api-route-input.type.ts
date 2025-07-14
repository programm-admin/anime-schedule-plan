import { HttpHeaders } from '@angular/common/http';
import { TF_User } from '../../core/models/user.model';

export type TF_ApiUserRouteInput =
    | 'REGISTER_USER'
    | 'LOGIN_USER'
    | 'DELETE_ACCOUNT';

export type TF_RequestInformation = {
    httpHeader: HttpHeaders;
    apiUrl: string;
} | null;
