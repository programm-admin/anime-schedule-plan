import { InjectionToken } from '@angular/core';
import { TF_MessageInput } from '../../shared/types/message-input.type';

export type TF_MessageRepository = {
    showSuccessMessage: (data: TF_MessageInput) => void;
    showWarnMessage: (data: TF_MessageInput) => void;
    showErrorMessage: (data: TF_MessageInput) => void;
    showInfoMessage: (data: TF_MessageInput) => void;
    showSecondaryMessage: (data: TF_MessageInput) => void;
    showContrastMessage: (data: TF_MessageInput) => void;
};

export const IT_MESSAGE_REPOSITORY = new InjectionToken<TF_MessageRepository>(
    'TF_MessageRepository',
);
