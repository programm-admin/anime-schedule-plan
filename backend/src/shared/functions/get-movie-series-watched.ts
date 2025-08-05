import { MovieModel } from "../../models/media/movie.model";
import { T_DBMovie, T_DBTVMovie } from "../interfaces-and-types/movie.type";

export const getMovieSeriesWatchedState = async (
    userAccountId: string,
    movieSeriesId: string
): Promise<boolean> => {
    // get all movies of movie series
    const foundMoviesList: T_DBMovie[] = await MovieModel.find({
        userAccountId,
        movieSeriesId,
    });

    if (foundMoviesList.length < 1) {
        return false;
    }

    // all movies are watched if there are no unwatched movies
    const areAllMoviesWatched: boolean =
        foundMoviesList.filter((movie: T_DBMovie) => !movie.watched).length < 1;

    return areAllMoviesWatched;
};
