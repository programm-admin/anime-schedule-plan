import { Inject, Injectable } from '@angular/core';
import {
    IT_MOVIE_REPOSITORY,
    TF_MovieRepository,
} from '../../domain/movie.repository';
import { Observable } from 'rxjs';
import { TF_Movie } from '../../models/movie.model';

@Injectable()
export class UC_Movie_GetMovie {
    constructor(
        @Inject(IT_MOVIE_REPOSITORY)
        private readonly movieRepository: TF_MovieRepository,
    ) {}

    public execute = (movieId: string): Observable<TF_Movie> => {
        return this.movieRepository.getMovie(movieId);
    };
}
