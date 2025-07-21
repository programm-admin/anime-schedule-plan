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
    episodeTVId: string;
    episodeNumber: number;
};

export type T_DBTVSeason = {
    seasonId: string;
    seasonUserAccountId: string;
    seasonTitle: string;
    seasonNumber: number;
    seasonDescription: string;
    seasonNumberOfEpisodes: number; // update only when creating/ removing episodes of this season (user should not update it manually!)
    seasonWatched: boolean; // update only when updating episodes watched attribut (user should not update it manually!)
    seasonRating: number; // update only when updating or creating
    seasonTVId: string;
};

export type T_DBTV = {
    id: string;
    userAccountId: string;
    title: string;
    description: string;
    notes: string;
    watched: boolean;
    numberOfSeasons: number;
    numberOfFilms: number;
};
