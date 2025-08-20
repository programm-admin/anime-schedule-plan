import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UC_User_GetIsUserLoggedIn } from '../../../core/use-cases/user/get-is-user-logged-in.use-case';
import { catchError, map, of, take } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { UC_Message_ShowErrorMessage } from '../../../core/use-cases/message/show-error-message.use-case';

export const authGuard: CanActivateFn = (route, state) => {
    const getUserSubjectUseCase = inject(UC_User_GetIsUserLoggedIn);
    const showErrorMessageUseCase = inject(UC_Message_ShowErrorMessage);
    const currentUrl: string = state.url;
    const router = inject(Router);

    return getUserSubjectUseCase.execute().pipe(
        take(1),
        map((isLoggedIn: boolean) => {
            if (
                (currentUrl === `/${APP_ROUTES['USER_LOGIN'].url}` ||
                    currentUrl === `/${APP_ROUTES['USER_REGISTER'].url}`) &&
                !isLoggedIn
            ) {
                return true;
            } else if (
                currentUrl.startsWith(`/${APP_ROUTES['MOVIE'].url}`) &&
                isLoggedIn
            ) {
                return true;
            }

            showErrorMessageUseCase.execute({
                summary: 'Kein Zugriff',
                detail: 'Sie haben keinen Zugriff auf diese Seite. Bitte loggen Sie sich ein, um Zugriff zu erhalten.',
            });
            return router.createUrlTree([APP_ROUTES['START'].url]);
        }),
        catchError(() => of(router.createUrlTree([APP_ROUTES['START'].url]))),
    );
};
