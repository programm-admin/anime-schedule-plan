import { Request, Response } from "express";
import { T_DBTV } from "../shared/interfaces-and-types/tv.type";
import { TVModel } from "../models/media/tv.model";
import { generateId } from "../shared/functions/generate-id";
import { error } from "console";

export const createTV = async (request: Request, response: Response) => {
    const { token, tv }: { token: string; tv: T_DBTV } = request.body;

    try {
        const foundTVList: T_DBTV[] = await TVModel.find({ title: tv.title });

        if (foundTVList.length > 0) {
            response.status(400).json({ message: "TV already exists." });
            return;
        }

        const newTV = new TVModel({
            id: generateId(false),
            title: tv.title,
            seasonIds: [],
        });

        await newTV.save();
        response.status(201).json({
            message: "New TV registered successfully.",
            tv: newTV,
        });
    } catch (error) {
        console.log("error when insert new tv");
        response.status(500).json({ message: "Error when creating new tv." });
    }
};

export const updateTV = async (request: Request, response: Response) => {
    const { token, tv }: { token: string; tv: T_DBTV } = request.body;

    try {
        const updatedTV = await TVModel.updateOne(
            { id: tv.id },
            {
                $set: {
                    title: tv.title,
                    seasonIds: tv.seasonIds,
                },
            }
        );

        if (!updateTV) {
            response.status(400).json({ message: "Error when updating tv." });
            return;
        }

        response
            .status(200)
            .json({ message: "Updated tv successfully.", tv: updatedTV });
    } catch (eror) {
        console.log("error when updating tv", error);
        response.status(500).json({ message: "Error when updating tv." });
    }
};
