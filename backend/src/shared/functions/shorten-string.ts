export const shortenString = (str: string): string => {
    const STRING_LIMIT: number = 20;

    return str.length < STRING_LIMIT
        ? str
        : `${str.substring(0, STRING_LIMIT)}...`;
};
