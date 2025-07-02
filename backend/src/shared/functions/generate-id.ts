import generateUniqueId from "generate-unique-id";
import { UNIQUE_ID_OBJECT } from "../variables/unique-id-object";

export const generateId = (isMovie: boolean): string => {
    const newId: string = `${isMovie ? "movie" : "tv"}-${generateUniqueId(
        UNIQUE_ID_OBJECT
    )}-${generateUniqueId(UNIQUE_ID_OBJECT)}`;

    return newId;
};
