import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UC_User_GetIsUserLoggedIn } from '../../../core/use-cases/user/get-is-user-logged-in.use-case';
import { catchError, map, of, take } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes';

export const authGuard: CanActivateFn = (route, state) => {
    const getUserSubjectUseCase = inject(UC_User_GetIsUserLoggedIn);
    const currentUrl: string = state.url;
    const router = inject(Router);

    return getUserSubjectUseCase.execute().pipe(
        take(1),
        map((isLoggedIn: boolean) => {
            if (
                (currentUrl === `/${APP_ROUTES['USER_LOGIN'].url}` ||
                    currentUrl === `/${APP_ROUTES['USER_REGISTER'].url}`) &&
                isLoggedIn
            ) {
                return router.createUrlTree([APP_ROUTES['START'].url]);
            } else if (
                currentUrl.startsWith('/' + APP_ROUTES['USER_START'].url) &&
                !isLoggedIn
            ) {
                return router.createUrlTree([APP_ROUTES['START'].url]);
            }

            return true;
        }),
        catchError(() => of(router.createUrlTree([APP_ROUTES['START'].url])))
    );
};
