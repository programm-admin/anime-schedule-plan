import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TF_LocalStorageRepository } from '../../../core/domain/local-storage.repository';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class INFREP_LocalStorage implements TF_LocalStorageRepository {
    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

    public getItem = (fieldName: string): string | null => {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(fieldName);
        }

        return null;
    };

    public setItem = (key: string, value: string) => {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.setItem(key, value);
        }
    };
}
