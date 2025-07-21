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
import { TVMovieModel } from "../models/media/movie.model";

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
        response.status(400).json({ message: "No season episodes found." });
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
        response.status(400).json({
            message: "Error when updating TV season because of episode udpate.",
        });
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
            response.status(400).json({ message: "Episode already exists." });
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
            response.status(400).json({
                message:
                    "Error when updating season because of updating episode.",
            });
            return;
        }

        const allTVSeasonsList: T_DBTVSeason[] = await TVSeasonModel.find({
            seasonUserAccountId: tvSeasonEpisode.episodeUserAccountId,
            seasonTVId: tvSeasonEpisode.episodeTVId,
        });

        if (allTVSeasonsList.length < 1) {
            response.status(400).json({
                message:
                    "Error when updating TV because no seasons were found.",
            });
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

        response.status(201).json({
            message: "Created new TV season episode successfully.",
            tvSeasonEpisode: {
                title: newTVSeasonEpisode.episodeTitle,
                id: newTVSeasonEpisode.episodeId,
            },
        });
    } catch (error) {
        console.log("error when creating new TV season episode:", error);
        response
            .status(500)
            .json({ message: "Error when creating new TV season episode." });
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
            response.status(400).json({ message: "No episode found." });
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
            response.status(400).json({
                message:
                    "Error when revalidating TV and season because of episode update.",
            });
            return;
        }

        response.status(200).json({ message: "Updated episode successfully." });
    } catch (error) {
        console.log("error when updating episode:", error);
        response
            .status(500)
            .json({ message: "Error when updating TV season episode." });
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
            response.status(400).json({ message: "Could not delete episode." });
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
            response.status(400).json({
                message:
                    "Error when revalidating TV and season because of episode update.",
            });
            return;
        }

        response.status(200).json({ message: "Deleted episode successfully." });
    } catch (error) {
        console.error("error when deleting an episode:", error);
        response
            .status(500)
            .json({ message: "Error when deleting the episode." });
    }
};
