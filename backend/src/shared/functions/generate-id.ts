import generateUniqueId from "generate-unique-id";
import { UNIQUE_ID_OBJECT } from "../variables/unique-id-object";
import { IDType } from "../interfaces-and-types/id.type";

export const generateId = (idType: IDType): string => {
    const newId: string = `${idType}-${generateUniqueId(
        UNIQUE_ID_OBJECT
    )}-${generateUniqueId(UNIQUE_ID_OBJECT)}`;

    return newId;
};
