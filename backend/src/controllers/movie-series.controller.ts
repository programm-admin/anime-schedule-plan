import { Request, Response } from "express";
import { T_DBMovieSeries } from "../shared/interfaces-and-types/movie-series.type";
import { MovieSeriesModel } from "../models/media/movie-series.model";
import { generateId } from "../shared/functions/generate-id";
import {
    getReturnMessage,
    getReturnMessageForObjectCreation,
} from "../shared/functions/get-return-messages";
import { shortenString } from "../shared/functions/shorten-string";
import { MovieModel } from "../models/media/movie.model";

/**
 * Function for creating a new movie series object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const createMovieSeries = async (
    request: Request,
    response: Response
) => {
    const { movieSeries }: { movieSeries: T_DBMovieSeries } = request.body;

    try {
        // check if movie series already exists
        const foundMovieSeriesList: T_DBMovieSeries[] =
            await MovieSeriesModel.find({
                title: movieSeries.title,
                userAccountId: movieSeries.userAccountId,
            });

        if (foundMovieSeriesList.length > 0) {
            //  movie series already exists
            response
                .status(400)
                .json({ message: "Filmreihe existiert bereits." });
            return;
        }

        const newMovieSeries = new MovieSeriesModel({
            id: generateId("MovieSeries"),
            userAccountId: movieSeries.userAccountId,
            title: movieSeries.title,
            description: movieSeries.description,
            notes: movieSeries.notes,
            numberOfFilms: 0,
            watched: false,
        });

        await newMovieSeries.save();
        response
            .status(201)
            .json(
                getReturnMessageForObjectCreation(
                    `Filmreihe ${shortenString(
                        movieSeries.title
                    )} erfolgreich angelegt.`,
                    false,
                    newMovieSeries.title,
                    newMovieSeries.id
                )
            );
    } catch (error) {
        console.error("error when creating new movie series", error);
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Anlegen der Filmreihe", true));
    }
};

/**
 * Function for updating an existing movie series object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const updateMovieSeries = async (
    request: Request,
    response: Response
) => {
    const { movieSeries }: { movieSeries: T_DBMovieSeries } = request.body;

    try {
        await MovieSeriesModel.updateOne(
            {
                id: movieSeries.id,
                userAccountId: movieSeries.userAccountId,
            },
            {
                $set: {
                    title: movieSeries.title,
                    description: movieSeries.description,
                    notes: movieSeries.notes,
                },
            }
        );

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Filmreihe ${shortenString(
                        movieSeries.title
                    )} erfolgreich aktualisiert`,
                    false
                )
            );
    } catch (error) {
        console.error("error when updating movie series", error);
        response
            .status(500)
            .json(
                getReturnMessage(
                    "Fehler beim Aktualisieren der Filmreihe",
                    true
                )
            );
    }
};

/**
 * Function for deleting an existing movie series and its movies from the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const deleteMovieSeries = async (
    request: Request,
    response: Response
) => {
    const { movieSeries }: { movieSeries: T_DBMovieSeries } = request.body;

    try {
        await MovieSeriesModel.deleteOne({
            id: movieSeries.id,
            userAccountId: movieSeries.userAccountId,
            title: movieSeries.title,
        });

        // delete all films related to film series
        await MovieModel.deleteMany({
            movieSeriesId: movieSeries.id,
            userAccountId: movieSeries.userAccountId,
        });
    } catch (error) {
        console.error("error when deleting movie series and its films");
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Löschen der Filmreihe", true));
    }
};
