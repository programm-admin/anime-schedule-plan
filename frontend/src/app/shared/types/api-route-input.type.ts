import { HttpHeaders } from '@angular/common/http';

export type TF_ApiUserRouteInput =
    | 'USER-REGISTER'
    | 'USER-LOGIN'
    | 'USER-DELETE'
    | 'MOVIE-NEW'
    | 'MOVIE-UPDATE'
    | 'MOVIE-DELETE'
    | 'MOVIE-GET_MOVIE'
    | 'TV-NEW'
    | 'TV-UPDATE'
    | 'TV_DELETE'
    | 'TV_SEASON-NEW'
    | 'TV_SEASON-UPDATE'
    | 'TV_SEASON-DELETE'
    | 'TV_SEASON_EPISODE-NEW'
    | 'TV_SEASON_EPISODE-UPDATE'
    | 'TV_SEASON_EPISODE-DELETE';

export type TF_RequestInformation = {
    httpHeader: HttpHeaders;
    apiUrl: string;
} | null;
