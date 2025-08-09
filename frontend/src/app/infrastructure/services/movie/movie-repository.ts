import { Injectable } from '@angular/core';
import { TF_MovieRepository } from '../../../core/domain/movie.repository';
import { Observable, shareReplay } from 'rxjs';
import { TF_Movie } from '../../../core/models/movie.model';
import {
    TF_MediaReturnMessageForObjectCreation,
    TF_MediaReturnMessage,
} from '../../../shared/types/media/media-return.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class INFREP_Movie implements TF_MovieRepository {
    private createMovie$: Observable<TF_MediaReturnMessageForObjectCreation> | null =
        null;
    private updateMovie$: Observable<TF_MediaReturnMessage> | null = null;
    private deleteMovie$: Observable<TF_MediaReturnMessage> | null = null;

    constructor(private http: HttpClient) {}

    public createMovie = (
        movie: TF_Movie
    ): Observable<TF_MediaReturnMessageForObjectCreation> => {
        if (this.createMovie$) return this.createMovie$;

        this.createMovie$ = this.http
            .post<TF_MediaReturnMessageForObjectCreation>('', movie)
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.createMovie$;
    };

    public updateMovie = (
        movie: TF_Movie
    ): Observable<TF_MediaReturnMessage> => {
        if (this.updateMovie$) return this.updateMovie$;

        this.updateMovie$ = this.http
            .patch<TF_MediaReturnMessage>('', movie)
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.updateMovie$;
    };

    deleteMovie = (movie: TF_Movie): Observable<TF_MediaReturnMessage> => {
        if (this.deleteMovie$) return this.deleteMovie$;

        this.deleteMovie$ = this.http
            .delete<TF_MediaReturnMessage>('', {
                body: movie,
            })
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));
        return this.deleteMovie$;
    };
}
