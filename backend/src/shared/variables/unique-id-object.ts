import { IUniqueId } from "../interfaces-and-types/unique-id.interface";

export const UNIQUE_ID_OBJECT: IUniqueId = {
    length: 30,
    includeSymbols: ["_", "-", "!", "?", "§", "&", "+", "#"],
    excludeSymbols: [
        "@",
        '"',
        "/",
        "\\",
        "%",
        "=",
        "[",
        "]",
        "(",
        ")",
        "{",
        "}",
        "'",
    ],
};
