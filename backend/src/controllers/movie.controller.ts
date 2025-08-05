import { Request, Response } from "express";
import { MovieModel } from "../models/media/movie.model";
import { T_DBMovie } from "../shared/interfaces-and-types/movie.type";
import { generateId } from "../shared/functions/generate-id";
import {
    getReturnMessage,
    getReturnMessageForObjectCreation,
} from "../shared/functions/get-return-messages";
import { shortenString } from "../shared/functions/shorten-string";
import { MovieSeriesModel } from "../models/media/movie-series.model";
import { getMovieSeriesWatchedState } from "../shared/functions/get-movie-series-watched";

export const createNewMovie = async (request: Request, response: Response) => {
    const { movie }: { movie: T_DBMovie } = request.body;

    try {
        const foundMovies: T_DBMovie[] = await MovieModel.find({
            title: movie.title,
        });

        if (foundMovies.length > 0) {
            response.status(400).json({ message: "Film already exists." });
            return;
        }

        const newMovie = new MovieModel({
            id: generateId("Movie"),
            title: movie.title,
            description: movie.description,
            plannedAirDate: movie.plannedAirDate,
            realAirDate: movie.realAirDate,
            watched: movie.watched,
            rating: movie.rating,
            notes: movie.notes,
            userAccountId: movie.userAccountId,
            movieSeriesId: movie.movieSeriesId,
        });

        await newMovie.save();
        response
            .status(201)
            .json(
                getReturnMessageForObjectCreation(
                    `Film ${shortenString(movie.title)} erfolgreich angelegt`,
                    false,
                    movie.title,
                    newMovie.id
                )
            );
    } catch (error) {
        console.log("error when insert new movie:", error);
        response.status(500).json({ message: "Error when create new movie." });
    }
};

export const updateMovie = async (request: Request, response: Response) => {
    const { movie }: { movie: T_DBMovie } = request.body;

    try {
        const updatedMovie = await MovieModel.updateOne(
            { userAccountId: movie.userAccountId, id: movie.id },
            {
                $set: {
                    title: movie.title,
                    description: movie.description,
                    plannedAirDate: movie.plannedAirDate,
                    realAirDate: movie.realAirDate,
                    watched: movie.watched,
                    rating: movie.rating,
                    notes: movie.notes,
                },
            },
            { new: true }
        );

        if (!updatedMovie) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        `Fehler beim Aktualisieren des Films ${shortenString(
                            movie.title
                        )}`,
                        true
                    )
                );
            return;
        }

        if (movie.movieSeriesId && movie.movieSeriesId.trim().length > 0) {
            // if movie is part of a movie series (if it has an id of a movie series) -> update movie series
            await MovieSeriesModel.updateOne(
                { id: movie.movieSeriesId, userAccountId: movie.userAccountId },
                {
                    $set: {
                        watched: await getMovieSeriesWatchedState(
                            movie.userAccountId,
                            movie.movieSeriesId
                        ),
                    },
                }
            );
        }

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Film ${shortenString(
                        movie.title
                    )} erfolgreich aktualisiert`,
                    false
                )
            );
    } catch (error) {
        console.log("error when updating movie", error);
        response
            .status(500)
            .json(
                getReturnMessage("Fehler beim Aktualisieren des Films", true)
            );
    }
};

/**
 * Function for deleting a single movie object from the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const deleteMovie = async (request: Request, response: Response) => {
    const { movie }: { movie: T_DBMovie } = request.body;

    try {
        // delete movie
        const deletedMovie = await MovieModel.deleteOne({
            id: movie.id,
            userAccountId: movie.userAccountId,
        });

        if (!deletedMovie) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        `Fehler beim Löschen des Films ${shortenString(
                            movie.title
                        )}`,
                        true
                    )
                );
            return;
        }

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Film ${shortenString(movie.title)} erfolgreich gelöscht`,
                    false
                )
            );
    } catch (error) {
        console.error("error when deleting tv:", error);
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Löschen des Films", true));
    }
};
