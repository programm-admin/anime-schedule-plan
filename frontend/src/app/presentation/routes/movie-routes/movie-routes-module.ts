import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { COMPMovieStartPage } from './comp-movie-start-page/comp-movie-start-page';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { COMPCreateMoviePage } from './comp-create-movie-page/comp-create-movie-page';

const MOVIE_ROUTES: Routes = [
    { path: '', component: COMPMovieStartPage },
    { path: APP_ROUTES['CREATE_MOVIE'].url, component: COMPCreateMoviePage },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(MOVIE_ROUTES)],
})
export class MovieRoutesModule {}
