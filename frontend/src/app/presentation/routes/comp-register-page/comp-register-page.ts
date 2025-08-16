import { Component, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
    FormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import {
    INPUT_PASSWORD_VARIABLES,
    INPUT_VARIABLES,
} from '../../../shared/constants/input-constants';
import { PasswordModule } from 'primeng/password';
import { passwordsMatchValidator } from '../../../shared/functions/password-confirmation-validator.functions';
import { UC_User_RegisterUser } from '../../../core/use-cases/user/register.use-case';
import { SelectModule } from 'primeng/select';
import { USER_AUTH_QUESTIONS } from '../../../shared/constants/user-auth-questions';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { ToastModule } from 'primeng/toast';
import { UC_Message_ShowSuccessMessage } from '../../../core/use-cases/message/show-success-message.use-case';
import { UC_Message_ShowErrorMessage } from '../../../core/use-cases/message/show-error-message.use-case';
import { isFieldInvalid } from '../../../shared/functions/validate-form-field.functions';
import { TF_RequestResponseMessage } from '../../../shared/types/request-response-message.type';
import { COMPBase } from '../../_components/comp-base/comp-base';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-comp-register-page',
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        FloatLabel,
        FormsModule,
        MessageModule,
        PasswordModule,
        SelectModule,
        ToastModule,
    ],
    templateUrl: './comp-register-page.html',
    styleUrl: './comp-register-page.scss',
    providers: [UC_User_RegisterUser, UC_Message_ShowSuccessMessage],
})
export class COMPRegisterPage extends COMPBase implements OnInit {
    public registerForm: FormGroup | null = null;
    public readonly INPUT_VARIABLES_LOCAL = INPUT_VARIABLES;
    public readonly INPUT_PASSWORD_VARIABLES_LOCAL = INPUT_PASSWORD_VARIABLES;
    public readonly INPUT_QUESTIONS: string[] = USER_AUTH_QUESTIONS;
    public isFormSubmitted: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly registerUserUseCase: UC_User_RegisterUser,
        private readonly showSuccessMessageUseCase: UC_Message_ShowSuccessMessage,
        private readonly showErrorMessageUseCase: UC_Message_ShowErrorMessage,
    ) {
        super();
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                userName: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.userNameLength,
                        ),
                    ],
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.passwordLength,
                        ),
                    ],
                ],
                passwordConfirmation: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.passwordLength,
                        ),
                    ],
                ],
                question: [this.INPUT_QUESTIONS[0], [Validators.required]],
                answer: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.answerLength,
                        ),
                    ],
                ],
            },
            {
                validators: passwordsMatchValidator,
            },
        );
    }

    public checkFieldInvalid = (fieldName: string): boolean => {
        return isFieldInvalid(
            this.registerForm,
            fieldName,
            this.isFormSubmitted,
        );
    };

    public submitForm = () => {
        this.isFormSubmitted = true;
        if (this.registerForm?.invalid) {
            return;
        }

        this.registerUserUseCase
            .execute({
                user: {
                    userName: this.registerForm?.get('userName')?.value,
                    password: this.registerForm?.get('password')?.value,
                    userType: 'normal',
                    authId: '',
                    userAuth: {
                        question: this.registerForm?.get('question')?.value,
                        answer: this.registerForm?.get('answer')?.value,
                    },
                },
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: TF_RequestResponseMessage) => {
                    this.showSuccessMessageUseCase.execute({
                        summary: 'Nutzer erfolgreich registriert.',
                        detail: response.message,
                    });

                    this.isFormSubmitted = false;
                },
                error: (err) => {
                    this.showErrorMessageUseCase.execute({
                        summary: 'Fehler beim Registrieren des Nutzers',
                        detail: err.error.message ?? JSON.stringify(err.error),
                    });
                },
            });
    };

    public cancelRegistration = () => {
        this.router.navigateByUrl(APP_ROUTES['START'].url);
    };
}
