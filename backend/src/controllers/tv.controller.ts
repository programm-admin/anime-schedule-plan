import { Request, Response } from "express";
import { T_DBTV, T_DBTVSeason } from "../shared/interfaces-and-types/tv.type";
import {
    TVModel,
    TVSeasonEpisodeModel,
    TVSeasonModel,
} from "../models/media/tv.model";
import { generateId } from "../shared/functions/generate-id";
import { error } from "console";

/**
 * Function for creating new TV object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const createTV = async (request: Request, response: Response) => {
    const { tv }: { tv: T_DBTV } = request.body;

    try {
        const foundTVList: T_DBTV[] = await TVModel.find({
            title: tv.title,
            userAccountId: tv.userAccountId,
            description: tv.description,
            notes: tv.notes,
        });

        if (foundTVList.length > 0) {
            response.status(400).json({ message: "TV already exists." });
            return;
        }

        const newTV = new TVModel({
            id: generateId("TV"),
            userAccountId: tv.userAccountId,
            title: tv.title,
            notes: tv.notes,
            watched: false,
            numberOfSeasons: 0,
        });

        await newTV.save();
        response.status(201).json({
            message: "New TV registered successfully.",
            tv: { title: newTV.title, id: newTV.id },
        });
    } catch (error) {
        console.log("error when insert new tv");
        response.status(500).json({ message: "Error when creating new tv." });
    }
};

/**
 * Function for updating an existing TV object in DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const updateTV = async (request: Request, response: Response) => {
    const { tv }: { tv: T_DBTV } = request.body;

    try {
        const updatedTV = await TVModel.updateOne(
            { id: tv.id, userAccountId: tv.userAccountId },
            {
                $set: {
                    title: tv.title,
                    description: tv.description,
                    notes: tv.notes,
                },
            }
        );

        if (!updateTV) {
            response.status(400).json({ message: "Error when updating tv." });
            return;
        }

        response.status(200).json({ message: "Updated tv successfully." });
    } catch (eror) {
        console.log("error when updating tv", error);
        response.status(500).json({ message: "Error when updating tv." });
    }
};

/**
 * Function for deleting an existing tv object and its season and episode objects from the DB.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */

export const deleteTV = async (request: Request, response: Response) => {
    const { tv }: { tv: T_DBTV } = request.body;

    try {
        // delete tv
        const deletedTV = await TVModel.deleteOne({
            id: tv.id,
            userAccountId: tv.userAccountId,
        });

        if (!deletedTV) {
            response.status(400).json({ message: "Could not delete TV." });
            return;
        }

        // delete all seasons of the tv
        const deletedTVSeasons = await TVSeasonModel.deleteMany({
            seasonUserAccountId: tv.userAccountId,
            seasonTVId: tv.id,
        });

        if (!deletedTVSeasons) {
            response
                .status(400)
                .json({ message: "Could not delete seasons of TV." });
            return;
        }

        // delete all episodes of the tv
        const deletedTVSeasonEpisodes = await TVSeasonEpisodeModel.deleteMany({
            episodeUserAccountId: tv.userAccountId,
            episodeTVId: tv.id,
        });

        if (!deletedTVSeasonEpisodes) {
            response
                .status(400)
                .json({ message: "Could not delete episodes of TV." });
            return;
        }

        response.status(200).json({
            message: "Deleted TV, its seasons and its episodes successfully.",
        });
    } catch (error) {
        console.error("error when deleting tv:", error);
        response.status(500).json({ message: "Error when deleting TV." });
    }
};
