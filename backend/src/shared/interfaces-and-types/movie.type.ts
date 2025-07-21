export type T_DBMovie = {
    id: string;
    userAccountId: string;
    title: string;
    description: string;
    plannedAirDate: Date;
    realAirDate: Date | undefined;
    watched: boolean;
    rating: number;
    notes: string;
};

export type T_DBTVMovie = T_DBMovie & {
    tvId: string;
};
