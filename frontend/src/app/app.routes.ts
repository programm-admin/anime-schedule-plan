import { Routes } from '@angular/router';
import { StartPageComponent } from './presentation/routes/start-page.component/start-page.component';
import { COMPRegisterPage } from './presentation/routes/comp-register-page/comp-register-page';
import { APP_ROUTES } from './shared/constants/app-routes';
import { COMPLoginPage } from './presentation/routes/comp-login-page/comp-login-page';

export const routes: Routes = [
    { path: APP_ROUTES['START'].url, component: StartPageComponent },
    { path: APP_ROUTES['USER_REGISTER'].url, component: COMPRegisterPage },
    { path: APP_ROUTES['USER_LOGIN'].url, component: COMPLoginPage },
];
