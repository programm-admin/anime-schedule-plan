import { generateId } from "../shared/functions/generate-id";
import { T_DBTVMovie } from "../shared/interfaces-and-types/movie.type";
import { Request, Response } from "express";
import { T_DBTV } from "../shared/interfaces-and-types/tv.type";
import { TVModel } from "../models/media/tv.model";
import { revalidateTVAndSeason } from "../shared/functions/revalidate-watched-status";
import { TVMovieModel } from "../models/media/tv-movie.model";

export const createTVMovie = async (request: Request, response: Response) => {
    const { tvMovie }: { tvMovie: T_DBTVMovie } = request.body;

    try {
        // check if movie already exists
        const foundTVMovieList: T_DBTVMovie[] = await TVMovieModel.find({
            id: tvMovie.id,
            userAccountId: tvMovie.userAccountId,
        });

        if (foundTVMovieList.length > 0) {
            response.status(400).json({
                message: "Dieser Film für diese Serie existiert bereits.",
            });
            return;
        }

        const newTVMovie = new TVMovieModel({
            id: generateId("TVMovie"),
            userAccountId: tvMovie.userAccountId,
            title: tvMovie.title,
            description: tvMovie.description,
            plannedAirDate: tvMovie.plannedAirDate,
            realAirDate: tvMovie.realAirDate,
            watched: tvMovie.watched,
            rating: tvMovie.rating,
            notes: tvMovie.notes,
            tvId: tvMovie.tvId,
        });

        await newTVMovie.save();

        // updating tv watched attribut ---------------
        const foundTVList: T_DBTV[] = await TVModel.find({
            id: tvMovie.id,
            userAccountId: tvMovie.userAccountId,
        });

        if (foundTVList.length < 1) {
            response.status(400).json({ message: "TV Serie existiert nicht." });
            return;
        }

        await TVModel.updateOne(
            {
                id: tvMovie.tvId,
                userAccountId: tvMovie.userAccountId,
            },
            {
                $set: {
                    watched: foundTVList[0].watched && tvMovie.watched,
                },
                $inc: {
                    numberOfFilms: 1,
                },
            }
        );

        response.status(201).json({
            message: `Film zur Serie ${foundTVList[0].title} erfolgreich angelegt.`,
        });
    } catch (error) {
        console.error("error when deleting tv:", error);
        response.status(500).json({
            message: `Fehler beim Anlegen des Films "${tvMovie.title}".`,
        });
    }
};

export const updateTVMovie = async (request: Request, response: Response) => {
    const { tvMovie }: { tvMovie: T_DBTVMovie } = request.body;

    try {
        await TVMovieModel.updateOne(
            {
                id: tvMovie.id,
                tvId: tvMovie.tvId,
                userAccountId: tvMovie.userAccountId,
            },
            {
                $set: {
                    title: tvMovie.title,
                    description: tvMovie.description,
                    plannedAirDate: tvMovie.plannedAirDate,
                    realAirDate: tvMovie.realAirDate,
                    watched: tvMovie.watched,
                    rating: tvMovie.rating,
                    notes: tvMovie.notes,
                },
            }
        );

        // update tv that tv movie belongs to
        const updatedTVSuccessfully: boolean = await revalidateTVAndSeason(
            tvMovie.tvId,
            "",
            tvMovie.userAccountId,
            false
        );

        if (!updatedTVSuccessfully) {
            response.status(400).json({
                message:
                    "Fehler beim Aktualisieren der TV-Serie durch die Aktualisierung des Films.",
            });
            return;
        }

        response.status(200).json({
            message: `Film "${tvMovie.title}" erfolgreich aktualisiert.`,
        });
    } catch (error) {
        console.log("error when updating tv movie", error);
        response.status(500).json({
            message: `Fehler beim Aktualisieren des Films "${tvMovie.title}".`,
        });
    }
};

export const deleteTVMovie = async (request: Request, response: Response) => {
    const { tvMovie }: { tvMovie: T_DBTVMovie } = request.body;

    try {
        const deletedTVMovie = await TVMovieModel.deleteOne({
            id: tvMovie.id,
            userAccountId: tvMovie.userAccountId,
            tvId: tvMovie.tvId,
        });

        if (deletedTVMovie.deletedCount < 1) {
            response
                .status(400)
                .json({ message: `Film "${tvMovie.title}" nicht gefunden` });
            return;
        }

        // update tv that tv movie belongs to
        const updatedTVSuccessfully: boolean = await revalidateTVAndSeason(
            tvMovie.tvId,
            "",
            tvMovie.userAccountId,
            false
        );

        if (!updatedTVSuccessfully) {
            response
                .status(400)
                .json({ message: `Film ${tvMovie.title}" nicht gefunden` });
            return;
        }

        response
            .status(200)
            .json({ message: `Film "${tvMovie.title}" erfolgreich gelöscht` });
    } catch (error) {
        console.error("error when deleting tv movie");
        response.status(500).json({
            message: `Fehler beim Löschen des Films "${tvMovie.title}".`,
        });
    }
};
