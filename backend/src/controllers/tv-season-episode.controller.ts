import { Request, Response } from "express";
import {
    T_DBTVSeason,
    T_DBTVSeasonEpisode,
} from "../shared/interfaces-and-types/tv.type";
import {
    TVModel,
    TVSeasonEpisodeModel,
    TVSeasonModel,
} from "../models/media/tv.model";
import { generateId } from "../shared/functions/generate-id";
import { revalidateTVAndSeason } from "../shared/functions/revalidate-watched-status";
import { T_DBTVMovie } from "../shared/interfaces-and-types/movie.type";
import { TVMovieModel } from "../models/media/tv-movie.model";
import {
    getReturnMessage,
    getReturnMessageForObjectCreation,
} from "../shared/functions/get-return-messages";
import { shortenString } from "../shared/functions/shorten-string";

const updateTVSeasonByEpisode = async (
    tvSeasonEpisode: T_DBTVSeasonEpisode,
    response: Response
): Promise<boolean> => {
    // update TV season for this episode
    const allEpisodesOfSeasonList: T_DBTVSeasonEpisode[] =
        await TVSeasonEpisodeModel.find({
            episodeUserAccountId: tvSeasonEpisode.episodeUserAccountId,
            episodeSeasonId: tvSeasonEpisode.episodeSeasonId,
        });

    if (allEpisodesOfSeasonList.length < 1) {
        response
            .status(400)
            .json(
                getReturnMessage("Keine Episoden zur Staffel gefunden", true)
            );
        return false;
    }

    const areAllEpisodesWatched: boolean =
        allEpisodesOfSeasonList.filter(
            (episode: T_DBTVSeasonEpisode) => !episode.episodeWatched
        ).length < 1;

    const updatedTVSeason = await TVSeasonModel.updateOne(
        {
            seasonId: tvSeasonEpisode.episodeSeasonId,
            seasonUserAccountId: tvSeasonEpisode.episodeUserAccountId,
        },
        {
            $set: {
                seasonNumberOfEpisodes: allEpisodesOfSeasonList.length,
                seasonWatched: areAllEpisodesWatched,
            },
        }
    );

    if (!updatedTVSeason) {
        response
            .status(400)
            .json(
                getReturnMessage("Fehler beim Aktualisieren der TV-Serie", true)
            );
        return false;
    }

    return true;
};

/**
 * Function for creating a new TV season episode object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const createTVSeasonEpisode = async (
    request: Request,
    response: Response
) => {
    const { tvSeasonEpisode }: { tvSeasonEpisode: T_DBTVSeasonEpisode } =
        request.body;

    try {
        const foundTVSeasonEpisodeList: T_DBTVSeasonEpisode[] =
            await TVSeasonEpisodeModel.find({
                episodeUserAccountId: tvSeasonEpisode.episodeUserAccountId,
                episodeSeasonId: tvSeasonEpisode.episodeSeasonId,
                episodeNumber: tvSeasonEpisode.episodeNumber,
            });

        if (foundTVSeasonEpisodeList.length > 0) {
            response
                .status(400)
                .json(getReturnMessage("Episode existiert bereits", true));
            return;
        }

        const newTVSeasonEpisode = new TVSeasonEpisodeModel({
            episodeId: generateId("TVSeasonEpisode"),
            episodeUserAccountId: tvSeasonEpisode.episodeUserAccountId,
            episodeTitle: tvSeasonEpisode.episodeTitle,
            episodeDescription: tvSeasonEpisode.episodeDescription,
            episodeNotes: tvSeasonEpisode.episodeNotes,
            episodePlannedAirDate: tvSeasonEpisode.episodePlannedAirDate,
            episodeRealAirDate: tvSeasonEpisode.episodeRealAirDate,
            episodeIsNormalEpisode: tvSeasonEpisode.episodeIsNormalEpisode,
            episodeWatched: tvSeasonEpisode.episodeWatched,
            episodeRating: tvSeasonEpisode.episodeRating,
            episodeSeasonId: tvSeasonEpisode.episodeSeasonId,
            episodeTVId: tvSeasonEpisode.episodeTVId,
            episodeNumber: tvSeasonEpisode.episodeNumber,
        });

        await newTVSeasonEpisode.save();

        // update TV season for this episode
        const updatedSeasonSuccessfully: boolean =
            await updateTVSeasonByEpisode(tvSeasonEpisode, response);

        if (!updatedSeasonSuccessfully) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        "Fehler beim Aktualisieren der Staffel",
                        true
                    )
                );
            return;
        }

        const allTVSeasonsList: T_DBTVSeason[] = await TVSeasonModel.find({
            seasonUserAccountId: tvSeasonEpisode.episodeUserAccountId,
            seasonTVId: tvSeasonEpisode.episodeTVId,
        });

        if (allTVSeasonsList.length < 1) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        "Fehler beim Aktualisieren der TV-Serie (keine Staffeln gefunden)",
                        true
                    )
                );
            return;
        }

        const allTVMoviesList: T_DBTVMovie[] = await TVMovieModel.find({
            tvId: tvSeasonEpisode.episodeTVId,
            userAccountId: tvSeasonEpisode.episodeUserAccountId,
        });

        const areAllSeasonsWatched: boolean =
            allTVSeasonsList.filter(
                (season: T_DBTVSeason) => !season.seasonWatched
            ).length < 1;
        const areAllFilmsWatched: boolean =
            allTVMoviesList.length < 1
                ? true
                : allTVMoviesList.filter(
                      (tvMovie: T_DBTVMovie) => !tvMovie.watched
                  ).length < 1;

        await TVModel.updateOne(
            {
                userAccountId: tvSeasonEpisode.episodeUserAccountId,
                id: tvSeasonEpisode.episodeTVId,
            },
            {
                $set: {
                    watched: areAllSeasonsWatched && areAllFilmsWatched,
                },
            }
        );

        response
            .status(201)
            .json(
                getReturnMessageForObjectCreation(
                    `Episode ${shortenString(
                        tvSeasonEpisode.episodeTitle
                    )} erfolgreich erstellt`,
                    false,
                    tvSeasonEpisode.episodeTitle,
                    newTVSeasonEpisode.id
                )
            );
    } catch (error) {
        console.log("error when creating new TV season episode:", error);
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Erstellen der Episode", true));
    }
};

/**
 * Function for updating an existing TV season episode object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const updateTVSeasonEpisode = async (
    request: Request,
    response: Response
) => {
    const { tvSeasonEpisode }: { tvSeasonEpisode: T_DBTVSeasonEpisode } =
        request.body;

    try {
        await TVSeasonEpisodeModel.updateOne(
            {
                episodeId: tvSeasonEpisode.episodeId,
                episodeUserAccountId: tvSeasonEpisode.episodeUserAccountId,
                episodeSeasonId: tvSeasonEpisode.episodeSeasonId,
                episodeTVId: tvSeasonEpisode.episodeTVId,
            },
            {
                $set: {
                    episodeTitle: tvSeasonEpisode.episodeTitle,
                    episodeDescription: tvSeasonEpisode.episodeDescription,
                    episodeNotes: tvSeasonEpisode.episodeNotes,
                    episodePlannedAirDate:
                        tvSeasonEpisode.episodePlannedAirDate,
                    episodeRealAirDate: tvSeasonEpisode.episodeRealAirDate,
                    episodeIsNormalEpisode:
                        tvSeasonEpisode.episodeIsNormalEpisode,
                    episodeWatched: tvSeasonEpisode.episodeWatched,
                    episodeRating: tvSeasonEpisode.episodeRating,
                    episodeNumber: tvSeasonEpisode.episodeNumber,
                },
            }
        );

        if (!updateTVSeasonEpisode) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        `Fehler beim Aktualisieren der Episode ${shortenString(
                            tvSeasonEpisode.episodeTitle
                        )}`,
                        true
                    )
                );
            return;
        }

        // update TV season for this episode
        const updatedTVAndSeasonSuccessfully: boolean =
            await revalidateTVAndSeason(
                tvSeasonEpisode.episodeTVId,
                tvSeasonEpisode.episodeSeasonId,
                tvSeasonEpisode.episodeUserAccountId,
                true
            );

        if (!updatedTVAndSeasonSuccessfully) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        "Fehler beim Aktualisieren der TV-Serie (Aktualisierung der Episode",
                        true
                    )
                );
            return;
        }

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Episode ${shortenString(
                        tvSeasonEpisode.episodeTitle
                    )} erfolgreich aktualisiert`,
                    false
                )
            );
    } catch (error) {
        console.log("error when updating episode:", error);
        response
            .status(500)
            .json(
                getReturnMessage("Fehler beim Aktualisieren der Episode", true)
            );
    }
};

/**
 * Function for deleting a single episode object from the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const deleteTVSeasonEpisode = async (
    request: Request,
    response: Response
) => {
    const { tvSeasonEpisode }: { tvSeasonEpisode: T_DBTVSeasonEpisode } =
        request.body;

    try {
        const deletedEpisode = await TVSeasonEpisodeModel.deleteOne({
            episodeId: tvSeasonEpisode.episodeId,
            episodeUserAccountId: tvSeasonEpisode.episodeUserAccountId,
        });

        if (!deletedEpisode) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        `Fehler beim Löschen der Episode ${shortenString(
                            tvSeasonEpisode.episodeTitle
                        )}`,
                        true
                    )
                );
            return;
        }

        // update TV season for this episode
        const updatedTVAndSeasonSuccessfully: boolean =
            await revalidateTVAndSeason(
                tvSeasonEpisode.episodeTVId,
                tvSeasonEpisode.episodeSeasonId,
                tvSeasonEpisode.episodeUserAccountId,
                true
            );

        if (!updatedTVAndSeasonSuccessfully) {
            response
                .status(400)
                .json(
                    getReturnMessage(
                        "Fehler beim Aktualisieren der TV-Serie und dessen Staffeln (Aktualisierung der Episode",
                        true
                    )
                );
            return;
        }

        response
            .status(200)
            .json(
                getReturnMessage(
                    `Episode ${shortenString(
                        tvSeasonEpisode.episodeTitle
                    )} erfolgreich gelöscht`,
                    false
                )
            );
    } catch (error) {
        console.error("error when deleting an episode:", error);
        response
            .status(500)
            .json(getReturnMessage("Fehler beim Löschen der Episode", true));
    }
};
