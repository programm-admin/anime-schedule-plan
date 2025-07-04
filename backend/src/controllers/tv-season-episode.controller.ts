import { Request, Response } from "express";
import { T_DBTVSeasonEpisode } from "../shared/interfaces-and-types/tv.type";
import { TVSeasonEpisodeModel } from "../models/media/tv.model";
import generateUniqueId from "generate-unique-id";
import { UNIQUE_ID_OBJECT } from "../shared/variables/unique-id-object";

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
            episodeId: generateUniqueId(UNIQUE_ID_OBJECT),
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
            episodeNumber: tvSeasonEpisode.episodeNumber,
        });

        await newTVSeasonEpisode.save();
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
