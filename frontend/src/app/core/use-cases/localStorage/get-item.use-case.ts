import { Inject, Injectable } from '@angular/core';
import {
    IT_LOCAL_STORAGE_REPOSITORY,
    TF_LocalStorageRepository,
} from '../../domain/local-storage.repository';

@Injectable()
export class UC_LocalStorage_GetItem {
    constructor(
        @Inject(IT_LOCAL_STORAGE_REPOSITORY)
        private readonly localStorageRepository: TF_LocalStorageRepository
    ) {}

    public execute = (fieldName: string): string | null => {
        return this.localStorageRepository.getItem(fieldName);
    };
}
