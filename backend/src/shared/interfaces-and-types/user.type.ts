export type T_DBUser = {
    userName: string;
    password: string;
    userType: string;
    authId: string;
    accountId: string;
    createdAccount: Date;
    lastLogin: Date;
    userAuth: {
        question: string;
        answer: string;
    };
};

export type T_RequestUser = Omit<
    T_DBUser,
    | "createdAccount"
    | "lastLogin"
    | "accountId"
    | "password"
    | "userAuth"
>;

export type T_RequestUserPayload = T_RequestUser & {
    iat?: number;
    exp?: number;
};

export type T_RegisterUser = Omit<
    T_DBUser,
    "createdAccount" | "lastLogin" | "accountId"
>;

export type T_LoginUser = Omit<
    T_DBUser,
    "authId" | "accountId" | "createdAccount" | "lastLogin" | "userAuth"
>;
