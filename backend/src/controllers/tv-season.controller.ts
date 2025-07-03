import { Request, Response } from "express";
import { T_DBTVSeason } from "../shared/interfaces-and-types/tv.type";
import { TVSeasonModel } from "../models/media/tv.model";
import { generateId } from "../shared/functions/generate-id";

export const createTVSeason = async (request: Request, response: Response) => {
    const { token, tvSeason }: { token: string; tvSeason: T_DBTVSeason } =
        request.body;

    try {
        const foundTVSeasonList: T_DBTVSeason[] = await TVSeasonModel.find({
            seasonTVId: tvSeason.seasonTVId,
            seasonNumber: tvSeason.seasonNumber,
        });

        if (foundTVSeasonList.length > 0) {
            response.status(400).json({ message: "TV season already exists." });
            return;
        }

        const newTVSeason = new TVSeasonModel({
            seasonId: generateId(false),
            seasonTitle: tvSeason.seasonTitle,
            seasonNumber: tvSeason.seasonNumber,
            seasonDescription: tvSeason.seasonDescription,
            seasonNumberOfEpisodes: tvSeason.seasonNumberOfEpisodes,
            seasonWatched: tvSeason.seasonWatched,
            seasonRating: tvSeason.seasonRating,
            seasonEpisodeIds: tvSeason.seasonEpisodeIds,
            seasonTVId: tvSeason.seasonTVId,
        });

        await newTVSeason.save();
        response.status(201).json({
            message: "New TV season registered successfully.",
            tvSeason: newTVSeason,
        });
    } catch (error) {
        console.log("error when creating new tv season");
        response
            .status(500)
            .json({ message: "Error when creating new TV season." });
    }
};
