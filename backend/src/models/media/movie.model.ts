import mongoose, { Document, mongo, Schema } from "mongoose";
import {
    T_DBMovie,
    T_DBTVMovie,
} from "../../shared/interfaces-and-types/movie.type";

export type T_MONGO_DBMovie = T_DBMovie & Document;
export type T_MONGO_DBTVMovie = T_DBTVMovie & Document;

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

const TVMovieSchema: Schema<T_MONGO_DBTVMovie> = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    userAccountId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    plannedAirDate: { type: Date, required: true },
    realAirDate: { type: Date, required: true },
    watched: { type: Boolean, required: true },
    rating: { type: Number, required: false },
    notes: { type: String, required: false },
    tvId: { type: String, required: true },
});

export const MovieModel = mongoose.model("Movie", MovieSchema);
export const TVMovieModel = mongoose.model("TVMovie", TVMovieSchema);
