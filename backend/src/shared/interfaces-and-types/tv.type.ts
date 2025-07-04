export type T_DBTVSeasonEpisode = {
    episodeId: string;
    episodeUserAccountId: string;
    episodeTitle: string;
    episodeDescription: string;
    episodeNotes: string;
    episodePlannedAirDate: Date;
    episodeRealAirDate: Date;
    episodeIsNormalEpisode: boolean;
    episodeWatched: boolean;
    episodeRating: number;
    episodeSeasonId: string;
    episodeNumber: number;
};

export type T_DBTVSeason = {
    seasonId: string;
    seasonUserAccountId: string;
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
    userAccountId: string;
    title: string;
    seasonIds: string[];
    description: string,
    notes: string
};
