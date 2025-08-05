import { TVMovieModel } from "../../models/media/tv-movie.model";
import {
    TVModel,
    TVSeasonEpisodeModel,
    TVSeasonModel,
} from "../../models/media/tv.model";
import { T_DBTVMovie } from "../interfaces-and-types/movie.type";
import {
    T_DBTVSeason,
    T_DBTVSeasonEpisode,
} from "../interfaces-and-types/tv.type";

const revalidateTVStatus = async (
    tvId: string,
    userAccountId: string
): Promise<boolean> => {
    try {
        // get all seasons of tv
        const allTVSeasonsList: T_DBTVSeason[] = await TVSeasonModel.find({
            seasonUserAccountId: userAccountId,
            seasonTVId: tvId,
        });
        const allTVMoviesList: T_DBTVMovie[] = await TVMovieModel.find({
            tvId,
            userAccountId,
        });

        if (allTVSeasonsList.length < 1) {
            // update current tv object by setting watched status to false
            const updatedTV = await TVModel.updateOne(
                { userAccountId, id: tvId },
                {
                    $set: {
                        watched: false,
                        numberOfSeasons: 0,
                        numberOfFilms: allTVMoviesList.length,
                    },
                }
            );

            return updatedTV ? true : false;
        }

        const areAllSeasonsWatched: boolean =
            allTVSeasonsList.filter(
                (season: T_DBTVSeason) => !season.seasonWatched
            ).length < 1;
        const areAllTVMoviesWatched: boolean =
            allTVMoviesList.length < 1
                ? true
                : allTVMoviesList.filter(
                      (tvMovie: T_DBTVMovie) => !tvMovie.watched
                  ).length < 1;

        const updatedTV = await TVModel.updateOne(
            { userAccountId, id: tvId },
            {
                $set: {
                    watched: areAllSeasonsWatched && areAllTVMoviesWatched,
                    numberOfSeasons: allTVSeasonsList.length,
                    numberOfFilms: allTVMoviesList.length,
                },
            }
        );

        return updatedTV ? true : false;
    } catch (error) {
        return false;
    }
};

const revalidateSeasonStatus = async (
    seasonId: string,
    userAccountId: string
): Promise<boolean> => {
    try {
        // get all episodes of season
        const allTVSeasonEpisodesList: T_DBTVSeasonEpisode[] =
            await TVSeasonEpisodeModel.find({
                episodeSeasonId: seasonId,
                episodeUserAccountId: userAccountId,
            });

        if (allTVSeasonEpisodesList.length < 1) {
            // update season attributes
            const updatedSeason = await TVSeasonModel.updateOne(
                { seasonId, seasonUserAccountId: userAccountId },
                {
                    $set: {
                        seasonWatched: false,
                        seasonNumberOfEpisodes: 0,
                    },
                }
            );

            return updatedSeason ? true : false;
        }

        const areAllEpisodesWatched: boolean =
            allTVSeasonEpisodesList.filter(
                (episode: T_DBTVSeasonEpisode) => !episode.episodeWatched
            ).length < 1;
        const updatedSeason = await TVSeasonModel.updateOne(
            { seasonId, seasonUserAccountId: userAccountId },
            {
                $set: {
                    seasonWatched: areAllEpisodesWatched,
                    seasonNumberOfEpisodes: allTVSeasonEpisodesList.length,
                },
            }
        );

        return updatedSeason ? true : false;
    } catch (error) {
        return false;
    }
};

/**
 * Function for updating and revalidating attributes of season and tv in DB.
 * @param tvId string
 * @param seasonId string
 * @param userAccountId string
 * @param revalidateSeason boolean
 * @returns Promise<boolean>
 */
export const revalidateTVAndSeason = async (
    tvId: string,
    seasonId: string,
    userAccountId: string,
    revalidateSeason: boolean
): Promise<boolean> => {
    let wasSeasonUpdatedsucessfully: boolean = false;

    if (revalidateSeason) {
        wasSeasonUpdatedsucessfully = await revalidateSeasonStatus(
            seasonId,
            userAccountId
        );

        if (!wasSeasonUpdatedsucessfully) return false;
    }

    // revalidate tv
    const wasTVUpdatedSuccessfully: boolean = await revalidateTVStatus(
        tvId,
        userAccountId
    );

    return wasTVUpdatedSuccessfully;
};
