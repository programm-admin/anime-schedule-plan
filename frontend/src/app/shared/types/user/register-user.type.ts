export type TF_RegisterUser = {
    // TF = Type Frontend
    user: {
        userName: string;
        password: string;
        userType: string;
        authId: string;
        userAuth: {
            question: string;
            answer: string;
        };
    };
};
