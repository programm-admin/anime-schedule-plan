import { Inject, Injectable } from '@angular/core';
import { TF_MovieRepository } from '../../../core/domain/movie.repository';
import { EMPTY, Observable, shareReplay } from 'rxjs';
import { TF_Movie } from '../../../core/models/movie.model';
import {
    TF_MediaReturnMessageForObjectCreation,
    TF_MediaReturnMessage,
} from '../../../shared/types/media/media-return.type';
import { HttpClient } from '@angular/common/http';
import { TF_RequestInformation } from '../../../shared/types/api-route-input.type';
import { getRequestInformation } from '../../../shared/functions/environment-variables.functions';
import {
    IT_USER_REPOSITORY,
    TF_UserRepository,
} from '../../../core/domain/user.repository';
import { TF_UserFull } from '../../../core/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class INFREP_Movie implements TF_MovieRepository {
    private createMovie$: Observable<TF_MediaReturnMessageForObjectCreation> | null =
        null;
    private updateMovie$: Observable<TF_MediaReturnMessage> | null = null;
    private deleteMovie$: Observable<TF_MediaReturnMessage> | null = null;
    private currentMovie$: Observable<TF_Movie> | null = null;

    constructor(
        private http: HttpClient,
        @Inject(IT_USER_REPOSITORY) private userRepository: TF_UserRepository,
    ) {}

    public createMovie = (
        movie: TF_Movie,
    ): Observable<TF_MediaReturnMessageForObjectCreation> => {
        const requestData: TF_RequestInformation = getRequestInformation(
            'MOVIE-NEW',
            true,
        );

        if (!requestData) return EMPTY;

        if (this.createMovie$) return this.createMovie$;

        this.createMovie$ = this.http
            .post<TF_MediaReturnMessageForObjectCreation>(
                requestData.apiUrl,
                { movie },
                { headers: requestData.httpHeader },
            )
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.createMovie$;
    };

    public updateMovie = (
        movie: TF_Movie,
    ): Observable<TF_MediaReturnMessage> => {
        const requestData: TF_RequestInformation = getRequestInformation(
            'MOVIE-UPDATE',
            true,
        );

        if (!requestData) return EMPTY;

        if (this.updateMovie$) return this.updateMovie$;

        this.updateMovie$ = this.http
            .patch<TF_MediaReturnMessage>(requestData.apiUrl, movie, {
                headers: requestData.httpHeader,
            })
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.updateMovie$;
    };

    deleteMovie = (movie: TF_Movie): Observable<TF_MediaReturnMessage> => {
        const requestData: TF_RequestInformation = getRequestInformation(
            'MOVIE-DELETE',
            true,
        );

        if (!requestData) return EMPTY;

        if (this.deleteMovie$) return this.deleteMovie$;

        this.deleteMovie$ = this.http
            .delete<TF_MediaReturnMessage>(requestData.apiUrl, {
                body: movie,
                headers: requestData.httpHeader,
            })
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.deleteMovie$;
    };

    getMovie = (movieId: string): Observable<TF_Movie> => {
        const requestData: TF_RequestInformation = getRequestInformation(
            'MOVIE-GET_MOVIE',
            true,
        );
        const user: TF_UserFull = this.userRepository.getUser();

        if (
            !requestData ||
            !user.user ||
            !user.user.userAccountId ||
            !user.user.userAccountId.trim()
        )
            return EMPTY;
        if (this.currentMovie$) return this.currentMovie$;

        this.currentMovie$ = this.http
            .post<TF_Movie>(
                requestData.apiUrl,
                { movieId, userAccountId: user.user.userAccountId },
                { headers: requestData.httpHeader },
            )
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.currentMovie$;
    };
}
