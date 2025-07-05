import { Request, Response } from "express";
import Movie from "../models/media/movie.model";
import { T_DBMovie } from "../shared/interfaces-and-types/movie.type";
import { generateId } from "../shared/functions/generate-id";

export const createNewMovie = async (request: Request, response: Response) => {
    const { token, movie }: { token: string; movie: T_DBMovie } = request.body;

    try {
        const foundMovies: T_DBMovie[] = await Movie.find({
            title: movie.title,
        });

        if (foundMovies.length > 0) {
            response.status(400).json({ message: "Film already exists." });
            return;
        }

        const newMovie = new Movie({
            id: generateId("Movie"),
            title: movie.title,
            description: movie.description,
            plannedAirDate: movie.plannedAirDate,
            realAirDate: movie.realAirDate,
            watched: movie.watched,
            rating: movie.rating,
            notes: movie.notes,
        });

        await newMovie.save();
        response.status(201).json({
            message: "New movie registered successfully.",
            movie: newMovie,
        });
    } catch (error) {
        console.log("error when insert new movie:", error);
        response.status(500).json({ message: "Error when create new movie." });
    }
};

export const updateMovie = async (request: Request, response: Response) => {
    const { token, movie }: { token: string; movie: T_DBMovie } = request.body;

    try {
        const updatedMovie: T_DBMovie | null = await Movie.findByIdAndUpdate(
            movie._id,
            {
                title: movie.title,
                description: movie.description,
                plannedAirDate: movie.plannedAirDate,
                realAirDate: movie.realAirDate,
                watched: movie.watched,
                rating: movie.rating,
                notes: movie.notes,
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
