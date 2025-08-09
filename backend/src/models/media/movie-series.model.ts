import mongoose, { Document, Schema } from "mongoose";
import { T_DBMovieSeries } from "../../shared/interfaces-and-types/movie-series.type";

export type T_MONGO_DBMovieSeries = T_DBMovieSeries & Document;

const MovieSeriesSchema: Schema<T_MONGO_DBMovieSeries> = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    userAccountId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    notes: { type: String, required: false },
    numberOfFilms: { type: Number, required: true },
    watched: { type: Boolean, required: true },
});

export const MovieSeriesModel = mongoose.model(
    "MovieSeries",
    MovieSeriesSchema
);
