import { Inject, Injectable } from '@angular/core';
import {
    IT_LOCAL_STORAGE_REPOSITORY,
    TF_LocalStorageRepository,
} from '../../domain/local-storage.repository';

@Injectable()
export class UC_LocalStorage_SetItem {
    constructor(
        @Inject(IT_LOCAL_STORAGE_REPOSITORY)
        private readonly localStorageRepository: TF_LocalStorageRepository,
    ) {}

    public execute = (key: string, value: string) => {
        return this.localStorageRepository.setItem(key, value);
    };
}
