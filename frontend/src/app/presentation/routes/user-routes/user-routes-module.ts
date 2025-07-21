import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { COMPUserStartPage } from '../comp-user-start-page/comp-user-start-page';

const USER_ROUTES: Routes = [{ path: '', component: COMPUserStartPage }];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(USER_ROUTES)],
})
export class UserRoutesModule {}
