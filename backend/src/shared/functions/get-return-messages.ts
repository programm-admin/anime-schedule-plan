export const getReturnMessage = (
    message: string,
    isError: boolean
): { message: string; isError: boolean } => {
    return { message, isError };
};

export const getReturnMessageForObjectCreation = (
    message: string,
    isError: boolean,
    title: string,
    id: string
): { message: string; isError: boolean; title: string; id: string } => {
    return { message, isError, title, id };
};
