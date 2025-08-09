import { generateId } from "../shared/functions/generate-id";
import { T_DBTVMovie } from "../shared/interfaces-and-types/movie.type";
import { Request, Response } from "express";
import { T_DBTV } from "../shared/interfaces-and-types/tv.type";
import { TVModel } from "../models/media/tv.model";
import { revalidateTVAndSeason } from "../shared/functions/revalidate-watched-status";
import { TVMovieModel } from "../models/media/tv-movie.model";
import {
    getReturnMessage,
    getReturnMessageForObjectCreation,
} from "../shared/functions/get-return-messages";
import { shortenString } from "../shared/functions/shorten-string";

export const createTVMovie = async (request: Request, response: Response) => {
    const { tvMovie }: { tvMovie: T_DBTVMovie } = request.body;

    try {
        // check if movie already exists
        const foundTVMovieList: T_DBTVMovie[] = await TVMovieModel.find({
            id: tvMovie.id,
            userAccountId: tvMovie.userAccountId,
        });

        if (foundTVMovieList.length > 0) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        "Dieser Film für diese Serie existiert bereits",
                        true
                    )
                );
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
            response
                .status(400)
                .json(getReturnMessage("TV Serie existiert nicht", true));
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

        response
            .status(201)
            .json(
                getReturnMessageForObjectCreation(
                    `Film ${shortenString(tvMovie.title)}`,
                    false,
                    tvMovie.title,
                    newTVMovie.id
                )
            );
    } catch (error) {
        console.error("error when deleting tv:", error);
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Anlegen des Films", true));
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
            response
                .status(400)
                .json(
                    getReturnMessage(
                        `Fehler beim Aktualisieren der TV-Serie des Films ${shortenString(
                            tvMovie.title
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
                    `Film ${shortenString(
                        tvMovie.title
                    )} erfolgreich aktualisiert`,
                    false
                )
            );
    } catch (error) {
        console.log("error when updating tv movie", error);
        response
            .status(500)
            .json(
                getReturnMessage("Fehler beim Aktualisieren des Films", true)
            );
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
                .json(
                    getReturnMessage(
                        `Film ${shortenString(tvMovie.title)} nicht gefunden`,
                        true
                    )
                );
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
                .json(
                    getReturnMessage(
                        `Film ${shortenString(tvMovie.title)} nicht gefunden`,
                        true
                    )
                );
            return;
        }

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Film ${shortenString(tvMovie.title)} erfolgreich gelöscht`,
                    false
                )
            );
    } catch (error) {
        console.error("error when deleting tv movie");
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Löschen des Films", true));
    }
};
