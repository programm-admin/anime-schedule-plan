export type T_DBMovie = {
    _id: string;
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
