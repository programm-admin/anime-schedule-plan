import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {
    INPUT_PASSWORD_VARIABLES,
    INPUT_VARIABLES,
} from '../../../shared/constants/input-constants';
import { Router } from '@angular/router';
import { isFieldInvalid } from '../../../shared/functions/validate-form-field.functions';
import { UC_User_LoginUser } from '../../../core/use-cases/user/login.use-case';
import { TF_RequestResponseUserLogin } from '../../../shared/types/user/response-user-login.type';
import { UC_Message_ShowSuccessMessage } from '../../../core/use-cases/message/show-success-message.use-case';
import { UC_Message_ShowErrorMessage } from '../../../core/use-cases/message/show-error-message.use-case';
import { COMPBase } from '../../_components/comp-base/comp-base';
import { takeUntil } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { isPlatformBrowser } from '@angular/common';
import {
    KEY_USER_LAST_LOGIN_LOCAL_STORAGE,
    KEY_USER_NAME_LOCAL_STORAGE,
    KEY_USER_TOKEN_LOCAL_STORAGE,
} from '../../../shared/constants/local-storage.constant';

@Component({
    selector: 'app-comp-login-page',
    imports: [
        ButtonModule,
        FloatLabel,
        ReactiveFormsModule,
        PasswordModule,
        InputTextModule,
        MessageModule,
    ],
    templateUrl: './comp-login-page.html',
    styleUrl: './comp-login-page.scss',
    providers: [
        UC_User_LoginUser,
        UC_Message_ShowSuccessMessage,
        UC_Message_ShowErrorMessage,
    ],
})
export class COMPLoginPage extends COMPBase implements OnInit {
    public loginForm: FormGroup | null = null;
    public readonly INPUT_VARIABLES_LOCAL = INPUT_VARIABLES;
    public readonly INPUT_PASSWORD_VARIABLES_LOCAL = INPUT_PASSWORD_VARIABLES;
    public isFormSubmitted: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly loginUserUseCase: UC_User_LoginUser,
        private readonly showSuccessMessageUseCase: UC_Message_ShowSuccessMessage,
        private readonly showErrorMessageUseCase: UC_Message_ShowErrorMessage,
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) {
        super();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(INPUT_VARIABLES.userNameLength),
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
        });
    }

    public checkFieldInvalid = (fieldName: string): boolean => {
        return isFieldInvalid(this.loginForm, fieldName, this.isFormSubmitted);
    };

    public submitForm = () => {
        this.isFormSubmitted = true;

        if (this.loginForm?.invalid) return;

        this.loginUserUseCase
            .execute({
                user: {
                    userName: this.loginForm?.get('userName')?.value,
                    password: this.loginForm?.get('password')?.value,
                    userType: 'normal',
                },
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: TF_RequestResponseUserLogin) => {
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem(
                            KEY_USER_NAME_LOCAL_STORAGE,
                            this.loginForm?.get('userName')?.value
                        );
                        localStorage.setItem(
                            KEY_USER_TOKEN_LOCAL_STORAGE,
                            response.token
                        );
                        localStorage.setItem(
                            KEY_USER_LAST_LOGIN_LOCAL_STORAGE,
                            response.lastLogin.toString()
                        );
                    }

                    this.showSuccessMessageUseCase.execute({
                        summary: 'Erfolgreich eingeloggt',
                        detail: response.message,
                    });

                    this.isFormSubmitted = false;
                },
                error: (err: any) => {
                    this.showErrorMessageUseCase.execute({
                        summary: 'Fehler beim Einloggen',
                        detail: err.error,
                    });
                },
            });
    };

    public cancelLogin = () => {
        this.router.navigateByUrl(APP_ROUTES['START'].url);
    };
}
