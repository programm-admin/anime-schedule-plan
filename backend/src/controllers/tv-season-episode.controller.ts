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
        allEpisodesOfSeasonList
            .map((episode: T_DBTVSeasonEpisode) => episode.episodeWatched)
            .filter((episodeWatched: boolean) => !episodeWatched).length < 1;

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
    const {
        token,
        tvSeasonEpisode,
    }: { token: string; tvSeasonEpisode: T_DBTVSeasonEpisode } = request.body;

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

        const areAllSeasonsWatched: boolean =
            allTVSeasonsList
                .map((season: T_DBTVSeason) => season.seasonWatched)
                .filter((isWatched: boolean) => !isWatched).length < 1;
        const updatedTV = await TVModel.updateOne(
            {
                userAccountId: tvSeasonEpisode.episodeUserAccountId,
                id: tvSeasonEpisode.episodeTVId,
            },
            {
                $set: {
                    watched: areAllSeasonsWatched,
                },
            }
        );

        if (!updatedTV) {
            response.status(400).json({
                message:
                    "Error when updating TV because no TV was found due to updating episode.",
            });
            return;
        }

        response.status(201).json({
            message: "Created new TV season episode successfully.",
            episode: newTVSeasonEpisode,
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
    const {
        token,
        tvSeasonEpisode,
    }: { token: string; tvSeasonEpisode: T_DBTVSeasonEpisode } = request.body;

    try {
        const updatedTVSeasonEpisode = await TVSeasonEpisodeModel.updateOne(
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
        const updatedSeasonSuccessfully: boolean =
            await updateTVSeasonByEpisode(tvSeasonEpisode, response);

        if (!updatedSeasonSuccessfully) {
            response.status(400).json({
                message:
                    "Error when updating season because of updating episode.",
            });
            return;
        }

        // update tv
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

        const areAllSeasonsWatched: boolean =
            allTVSeasonsList
                .map((season: T_DBTVSeason) => season.seasonWatched)
                .filter((isWatched: boolean) => !isWatched).length < 1;
        const updatedTV = await TVModel.updateOne(
            {
                userAccountId: tvSeasonEpisode.episodeUserAccountId,
                id: tvSeasonEpisode.episodeTVId,
            },
            {
                $set: {
                    watched: areAllSeasonsWatched,
                },
            }
        );

        if (!updatedTV) {
            response.status(400).json({
                message:
                    "Error when updating TV because no TV was found due to updating episode.",
            });
            return;
        }

        response.status(200).json({
            message: "Updated episode successfully.",
            episode: updatedTVSeasonEpisode,
        });
    } catch (error) {
        console.log("error when updating episode:", error);
        response
            .status(500)
            .json({ message: "Error when updating TV season episode." });
    }
};
