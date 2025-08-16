import { Inject, Injectable } from '@angular/core';
import {
    IT_MOVIE_REPOSITORY,
    TF_MovieRepository,
} from '../../domain/movie.repository';
import { TF_Movie } from '../../models/movie.model';
import { Observable } from 'rxjs';
import { TF_MediaReturnMessage } from '../../../shared/types/media/media-return.type';

@Injectable()
export class UC_Movie_DeleteMovie {
    constructor(
        @Inject(IT_MOVIE_REPOSITORY)
        private readonly movieRepository: TF_MovieRepository,
    ) {}

    public execute = (movie: TF_Movie): Observable<TF_MediaReturnMessage> => {
        return this.movieRepository.deleteMovie(movie);
    };
}
