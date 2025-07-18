export type TF_AppRoute = {
    name: string;
    url: string;
    isVisible: boolean;
};

export type TF_AppRoutePresentation = Omit<TF_AppRoute, 'isVisible'>;
