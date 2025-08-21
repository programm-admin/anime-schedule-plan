import { Observable } from 'rxjs';
import { TF_Movie } from '../models/movie.model';
import {
    TF_MediaReturnMessage,
    TF_MediaReturnMessageForObjectCreation,
} from '../../shared/types/media/media-return.type';
import { InjectionToken } from '@angular/core';

export type TF_MovieRepository = {
    createMovie: (
        movie: TF_Movie,
    ) => Observable<TF_MediaReturnMessageForObjectCreation>;
    updateMovie: (movie: TF_Movie) => Observable<TF_MediaReturnMessage>;
    deleteMovie: (movie: TF_Movie) => Observable<TF_MediaReturnMessage>;
    getMovie: (movieId: string) => Observable<TF_Movie>;
};

export const IT_MOVIE_REPOSITORY = new InjectionToken<TF_MovieRepository>(
    'T_MovieRepository',
);
