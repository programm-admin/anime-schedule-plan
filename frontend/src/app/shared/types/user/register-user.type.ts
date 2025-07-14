export type TF_RegisterUser = {
    // TF = Type Frontend
    userName: string;
    password: string;
    userType: string;
    authId: string;
    userAuth: {
        question: string;
        answer: string;
    };
};
