import mongoose, { Document, mongo, Schema } from "mongoose";
import { T_DBMovie } from "../../shared/interfaces-and-types/movie.type";

export type T_MONGO_DBMovie = T_DBMovie & Document;

const MovieSchema: Schema<T_MONGO_DBMovie> = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    userAccountId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    plannedAirDate: { type: Date, required: true },
    realAirDate: { type: Date, required: true },
    watched: { type: Boolean, required: true },
    rating: { type: Number, required: false },
    notes: { type: String, required: false },
});

export const MovieModel = mongoose.model("Movie", MovieSchema);
