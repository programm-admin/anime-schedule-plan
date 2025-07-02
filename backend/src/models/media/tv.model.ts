import mongoose from "mongoose";

const TVSeasonEpisodeSchema = new mongoose.Schema({
    episodeId: { type: String, required: true, unique: true },
    episodeTitle: { type: String, required: false },
    episodeDescription: { type: String, required: false },
    episodeNotes: { type: String, required: false },
    episodePlannedAirDate: { type: Date, required: true },
    episodeRealAirDate: { type: Date, required: true },
    episodeIsNormalEpisode: { type: Boolean, required: true },
    episodeWatched: { type: Boolean, required: true },
    episodeRating: { type: Number, required: false },
});

const TVSeasonSchema = new mongoose.Schema({
    seasonId: { type: String, required: true, unique: true },
    seasonTitle: { type: String, required: true },
    seasonNumber: { type: Number, required: true },
    seasonDescription: { type: String, required: false },
    seasonNumberOfEpisodes: { type: Number, required: true },
    seasonWatched: { type: Boolean, required: true },
    seasonRating: { type: Number, required: false },
    seasonEpisodes: { type: [TVSeasonEpisodeSchema], required: true },
});

const TVSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    seasons: { type: [TVSeasonSchema], required: true },
});

export const TVModel = mongoose.model("TV", TVSchema);
export const TVSeasonModel = mongoose.model("TVSeason", TVSeasonSchema);
export const TVSeasonEpisodeModel = mongoose.model(
    "TVSeasonEpisode",
    TVSeasonEpisodeSchema
);
