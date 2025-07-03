export type T_DBTVSeasonEpisode = {
    episodeId: string;
    episodeTitle: string;
    episodeDescription: string;
    episodeNotes: string;
    episodePlannedAirDate: Date;
    episodeRealAirDate: Date;
    episodeIsNormalEpisode: boolean;
    episodeWatched: boolean;
    episodeRating: number;
    episodeSeasonId: string;
};

export type T_DBTVSeason = {
    seasonId: string;
    seasonTitle: string;
    seasonNumber: number;
    seasonDescription: string;
    seasonNumberOfEpisodes: number;
    seasonWatched: boolean;
    seasonRating: number;
    seasonEpisodeIds: string[];
    seasonTVId: string;
};

export type T_DBTV = {
    id: string;
    title: string;
    seasonIds: string[];
};
