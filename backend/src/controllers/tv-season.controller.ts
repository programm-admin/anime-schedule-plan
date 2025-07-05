import { Request, Response } from "express";
import { T_DBTV, T_DBTVSeason } from "../shared/interfaces-and-types/tv.type";
import { TVModel, TVSeasonModel } from "../models/media/tv.model";
import { generateId } from "../shared/functions/generate-id";

/**
 * Function for creating a new tv season object in the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const createTVSeason = async (request: Request, response: Response) => {
    const { token, tvSeason }: { token: string; tvSeason: T_DBTVSeason } =
        request.body;

    try {
        const foundTVSeasonList: T_DBTVSeason[] = await TVSeasonModel.find({
            seasonTVId: tvSeason.seasonTVId,
            seasonNumber: tvSeason.seasonNumber,
            seasonUserAccountId: tvSeason.seasonUserAccountId,
        });

        if (foundTVSeasonList.length > 0) {
            response.status(400).json({ message: "TV season already exists." });
            return;
        }

        const newTVSeason = new TVSeasonModel({
            seasonId: generateId("TVSeason"),
            seasonUserAccountId: tvSeason.seasonUserAccountId,
            seasonTitle: tvSeason.seasonTitle,
            seasonNumber: tvSeason.seasonNumber,
            seasonDescription: tvSeason.seasonDescription,
            seasonNumberOfEpisodes: 0,
            seasonWatched: false,
            seasonRating: tvSeason.seasonRating,
            seasonTVId: tvSeason.seasonTVId,
        });

        await newTVSeason.save();

        // updating tv watched attribut
        const updatedTV = await TVModel.updateOne(
            {
                id: tvSeason.seasonTVId,
                userAccountId: tvSeason.seasonUserAccountId,
            },
            {
                $set: {
                    watched: false,
                },
                $inc: {
                    numberOfSeasons: 1,
                },
            }
        );

        if (!updatedTV) {
            response.status(400).json({
                message: "Error when updating TV due to update of season.",
            });
            return;
        }

        response.status(201).json({
            message: "New TV season registered successfully.",
            tvSeason: newTVSeason,
        });
    } catch (error) {
        console.log("error when creating new tv season:", error);
        response
            .status(500)
            .json({ message: "Error when creating new TV season." });
    }
};

/**
 * Function for updating existing TV season object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const updateTVSeason = async (request: Request, response: Response) => {
    const {
        token,
        tvSeason,
    }: { token: DOMStringList; tvSeason: T_DBTVSeason } = request.body;

    try {
        const updatedTVSeason = await TVSeasonModel.updateOne(
            { seasonId: tvSeason.seasonId },
            {
                $set: {
                    seasonTitle: tvSeason.seasonTitle,
                    seasonNumber: tvSeason.seasonNumber,
                    seasonDescription: tvSeason.seasonDescription,
                    seasonRating: tvSeason.seasonRating,
                },
            }
        );

        if (!updateTVSeason) {
            response
                .status(400)
                .json({ message: "Error when updating TV season." });
            return;
        }

        const allSeasonsOfTVList: T_DBTVSeason[] = await TVModel.find({
            id: tvSeason.seasonTVId,
            userAccountId: tvSeason.seasonUserAccountId,
        });

        if (allSeasonsOfTVList.length < 1) {
            response.status(400).json({
                message:
                    "Error when updating TV because no seasons were found.",
            });
            return;
        }

        const areAllSeasonsWatched: boolean =
            allSeasonsOfTVList
                .map((season: T_DBTVSeason) => season.seasonWatched)
                .filter((watched: boolean) => !watched).length < 1;
        const updatedTV = await TVModel.updateOne(
            {
                id: tvSeason.seasonTVId,
                userAccountId: tvSeason.seasonUserAccountId,
            },
            {
                $set: {
                    watched: areAllSeasonsWatched,
                },
                $inc: {
                    numberOfSeasons: 1,
                },
            }
        );

        if (!updatedTV) {
            response.status(400).json({
                message: "Error when updating TV because of updating season",
            });
            return;
        }

        response
            .status(200)
            .json({ message: "Updated TV season successfully." });
    } catch (error) {
        console.log("error when updating TV season:", error);
        response
            .status(500)
            .json({ message: "Error when updating TV season." });
    }
};
