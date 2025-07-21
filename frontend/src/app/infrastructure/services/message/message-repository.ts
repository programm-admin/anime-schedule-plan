import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TF_MessageRepository } from '../../../core/domain/message.repository';
import {
    TF_MessageInput,
    TF_MessageInputFull,
} from '../../../shared/types/message-input.type';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class INFREP_Message implements TF_MessageRepository {
    constructor(
        private readonly messageService: MessageService,
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) {}

    private showMessageBasedOnType = (input: TF_MessageInputFull) => {
        if (isPlatformBrowser(this.platformId)) {
            this.messageService.add({
                severity: input.severity,
                summary: input.summary,
                detail: input.detail,
            });
        }
    };

    public showSuccessMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'success',
            summary: data.summary,
            detail: data.detail,
        });
    };

    public showWarnMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'warn',
            summary: data.summary,
            detail: data.detail,
        });
    };

    public showErrorMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'error',
            summary: data.summary,
            detail: data.detail,
        });
    };

    public showInfoMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'info',
            summary: data.summary,
            detail: data.detail,
        });
    };

    public showSecondaryMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'secondary',
            summary: data.summary,
            detail: data.detail,
        });
    };

    public showContrastMessage = (data: TF_MessageInput) => {
        this.showMessageBasedOnType({
            severity: 'contrast',
            summary: data.summary,
            detail: data.detail,
        });
    };
}
