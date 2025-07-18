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
    ],
    templateUrl: './comp-register-page.html',
    styleUrl: './comp-register-page.scss',
    providers: [UC_User_RegisterUser],
})
export class COMPRegisterPage implements OnInit {
    public registerForm: FormGroup | null = null;
    public readonly INPUT_VARIABLES_LOCAL = INPUT_VARIABLES;
    public readonly INPUT_PASSWORD_VARIABLES_LOCAL = INPUT_PASSWORD_VARIABLES;
    public readonly INPUT_QUESTIONS: string[] = USER_AUTH_QUESTIONS;
    public isFormSubmitted: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly registerUserUseCase: UC_User_RegisterUser,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                userName: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.userNameLength
                        ),
                    ],
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.passwordLength
                        ),
                    ],
                ],
                passwordConfirmation: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.passwordLength
                        ),
                    ],
                ],
                question: [this.INPUT_QUESTIONS[0], [Validators.required]],
                answer: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(
                            this.INPUT_VARIABLES_LOCAL.answerLength
                        ),
                    ],
                ],
            },
            {
                validators: passwordsMatchValidator,
            }
        );
    }

    public isFieldValid = (fieldName: string): boolean => {
        if (this.registerForm) {
            const fieldControl = this.registerForm.get(fieldName);

            return (
                (fieldControl?.invalid ?? false) &&
                (fieldControl?.touched || this.isFormSubmitted)
            );
        }
        return false;
    };

    public submitForm = () => {
        if (this.registerForm?.invalid) {
            return;
        }

        this.registerUserUseCase.execute({
            userName: this.registerForm?.get('userName')?.value,
            password: this.registerForm?.get('password')?.value,
            userType: 'normal',
            authId: '',
            userAuth: {
                question: '',
                answer: '',
            },
        });
    };

    public cancelRegistration = () => {
        this.router.navigateByUrl(APP_ROUTES['START'].url);
    };
}
