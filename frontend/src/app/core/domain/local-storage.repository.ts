import { InjectionToken } from '@angular/core';

export type TF_LocalStorageRepository = {
    // TF = Type Frontend
    getItem: (fieldName: string) => string | null;
    setItem: (key: string, value: string) => void;
};

export const IT_LOCAL_STORAGE_REPOSITORY =
    new InjectionToken<TF_LocalStorageRepository>('TF_LocalStorageRepository');
