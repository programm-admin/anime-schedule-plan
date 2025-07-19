import { Inject, Injectable } from '@angular/core';
import {
    IT_MESSAGE_REPOSITORY,
    TF_MessageRepository,
} from '../../domain/message.repository';
import { TF_MessageInput } from '../../../shared/types/message-input.type';

@Injectable()
export class UC_Message_ShowErrorMessage {
    constructor(
        @Inject(IT_MESSAGE_REPOSITORY)
        private readonly messageRepository: TF_MessageRepository
    ) {}

    public execute = (data: TF_MessageInput) => {
        return this.messageRepository.showErrorMessage(data);
    };
}
