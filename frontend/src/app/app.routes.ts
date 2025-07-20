import { Routes } from '@angular/router';
import { StartPageComponent } from './presentation/routes/start-page.component/start-page.component';
import { COMPRegisterPage } from './presentation/routes/comp-register-page/comp-register-page';
import { APP_ROUTES } from './shared/constants/app-routes';
import { COMPLoginPage } from './presentation/routes/comp-login-page/comp-login-page';
import { COMPUserStartPage } from './presentation/routes/comp-user-start-page/comp-user-start-page';

export const routes: Routes = [
    { path: APP_ROUTES['START'].url, component: StartPageComponent },
    {
        path: APP_ROUTES['USER_REGISTER'].url,
        loadComponent: () =>
            import(
                './presentation/routes/comp-register-page/comp-register-page'
            ).then((registerPage) => registerPage.COMPRegisterPage),
    },
    { path: APP_ROUTES['USER_LOGIN'].url, component: COMPLoginPage },
    {
        path: APP_ROUTES['USER_START'].url,
        loadComponent: () =>
            import('./presentation/routes/user-routes/user-routes-module').then(
                (UserRoutesModule) => UserRoutesModule.UserRoutesModule
            ),
    },
];
