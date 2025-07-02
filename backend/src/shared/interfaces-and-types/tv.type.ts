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
};

export type T_DBTVSeason = {
    seasonId: string;
    seasonTitle: string;
    seasonNumber: number;
    seasonDescription: string;
    seasonNumberOfEpisodes: number;
    seasonWatched: boolean;
    seasonRating: number;
    seasonEpisodes: T_DBTVSeasonEpisode[];
};

export type T_DBTV = {
    id: string;
    title: string;
    seasons: T_DBTVSeason[];
};
