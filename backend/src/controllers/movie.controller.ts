import { Request, Response } from "express";
import { MovieModel } from "../models/media/movie.model";
import { T_DBMovie } from "../shared/interfaces-and-types/movie.type";
import { generateId } from "../shared/functions/generate-id";

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
        });

        await newMovie.save();
        response.status(201).json({
            message: "New movie registered successfully.",
            movie: { title: newMovie.title, id: newMovie.id },
        });
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

        if (!updateMovie) {
            response
                .status(400)
                .json({ message: "Error when updating movie." });
            return;
        }

        response.status(200).json({
            message: "Updated movie successfully.",
            movie: updatedMovie,
        });
    } catch (error) {
        console.log("error when updating movie", error);
        response.status(500).json({ message: "Error when updating movie." });
    }
};

/**
 * Function for deleting a single movie object from the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const deleteMovie = async (request: Request, response: Response) => {
    const { token, movie }: { token: string; movie: T_DBMovie } = request.body;

    try {
        // delete movie
        const deletedMovie = await MovieModel.deleteOne({
            id: movie.id,
            userAccountId: movie.userAccountId,
        });

        if (!deletedMovie) {
            response.status(400).json({ message: "Could not delete TV." });
            return;
        }

        response.status(200).json({ message: "Deleted movie successfully." });
    } catch (error) {
        console.error("error when deleting tv:", error);
        response.status(500).json({ message: "Error when deleting TV." });
    }
};
