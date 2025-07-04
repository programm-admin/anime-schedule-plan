import mongoose, { Document, Schema } from "mongoose";
import {
    T_DBTV,
    T_DBTVSeason,
    T_DBTVSeasonEpisode,
} from "../../shared/interfaces-and-types/tv.type";

export type T_MONGO_DBTVSeasonEpisode = T_DBTVSeasonEpisode & Document;

const TVSeasonEpisodeSchema: Schema<T_MONGO_DBTVSeasonEpisode> =
    new mongoose.Schema({
        episodeId: { type: String, required: true, unique: true },
        episodeUserAccountId: { type: String, required: true, unique: true },
        episodeTitle: { type: String, required: false },
        episodeDescription: { type: String, required: false },
        episodeNotes: { type: String, required: false },
        episodePlannedAirDate: { type: Date, required: true },
        episodeRealAirDate: { type: Date, required: true },
        episodeIsNormalEpisode: { type: Boolean, required: true },
        episodeWatched: { type: Boolean, required: true },
        episodeRating: { type: Number, required: false },
        episodeSeasonId: { type: String, required: true },
        episodeNumber: { type: Number, required: true },
    });

export type T_MONGO_DBTVSeason = T_DBTVSeason & Document;

const TVSeasonSchema: Schema<T_MONGO_DBTVSeason> = new mongoose.Schema({
    seasonId: { type: String, required: true, unique: true },
    seasonUserAccountId: { type: String, required: true, unique: true },
    seasonTitle: { type: String, required: true },
    seasonNumber: { type: Number, required: true },
    seasonDescription: { type: String, required: false },
    seasonNumberOfEpisodes: { type: Number, required: true },
    seasonWatched: { type: Boolean, required: true },
    seasonRating: { type: Number, required: false },
    seasonEpisodeIds: { type: [String], required: true },
    seasonTVId: { type: String, required: true },
});

export type T_MONGO_DBTV = T_DBTV & Document;

const TVSchema: Schema<T_MONGO_DBTV> = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    userAccountId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    seasonIds: { type: [String], required: true },
    description: { type: String, required: false },
    notes: { type: String, required: false },
});

export const TVModel = mongoose.model("TV", TVSchema);
export const TVSeasonModel = mongoose.model("TVSeason", TVSeasonSchema);
export const TVSeasonEpisodeModel = mongoose.model(
    "TVSeasonEpisode",
    TVSeasonEpisodeSchema
);
