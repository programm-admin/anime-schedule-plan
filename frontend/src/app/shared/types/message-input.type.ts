export type TF_MessageInput = {
    summary: string;
    detail: string;
};

export type TF_MessageInputFull = TF_MessageInput & {
    severity: 'info' | 'success' | 'warn' | 'error' | 'contrast' | 'secondary';
};
