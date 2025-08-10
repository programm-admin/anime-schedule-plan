export type TF_User = {
    // TF = Type Frontend
    userName: string;
    userToken: string;
    userAccountId: string;
    userLastLogin: Date;
};

export type TF_UserFull = {
    user: TF_User | null;
    status: 'loading' | 'finished' | 'unknown' | 'server';
};
