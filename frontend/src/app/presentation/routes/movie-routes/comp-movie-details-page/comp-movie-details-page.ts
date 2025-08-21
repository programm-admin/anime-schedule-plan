import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { COMPBase } from '../../../_components/comp-base/comp-base';
import { takeUntil } from 'rxjs';
import { UC_Movie_GetMovie } from '../../../../core/use-cases/movie/get-movie.use-case';
import { UC_Message_ShowErrorMessage } from '../../../../core/use-cases/message/show-error-message.use-case';
import { TF_Movie } from '../../../../core/models/movie.model';
import { UC_User_LogoutUser } from '../../../../core/use-cases/user/logout-user.use-case';
import { UC_Navigation_NavigateToStartPage } from '../../../../core/use-cases/navigation/navigate-to-start-page.use-case';

@Component({
    selector: 'app-comp-movie-details-page',
    imports: [],
    templateUrl: './comp-movie-details-page.html',
    styleUrl: './comp-movie-details-page.scss',
    providers: [
        UC_Movie_GetMovie,
        UC_Message_ShowErrorMessage,
        UC_User_LogoutUser,
        UC_Navigation_NavigateToStartPage,
    ],
})
export class COMPMovieDetailsPage extends COMPBase implements OnInit {
    public currentId: string | null = null;
    public currentMovie: TF_Movie | null = null;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private getMovieUseCase: UC_Movie_GetMovie,
        private showErrorMessageUseCase: UC_Message_ShowErrorMessage,
        private logoutUserUseCase: UC_User_LogoutUser,
        private navigateToStartPageUseCase: UC_Navigation_NavigateToStartPage,
    ) {
        super();
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((params: ParamMap) => {
                this.currentId = params.get('id');

                if (this.currentId) {
                    this.loadMovie(this.currentId);
                }
            });
    }

    public loadMovie = (movieId: string) => {
        this.getMovieUseCase
            .execute(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (movie: TF_Movie) => {
                    this.currentMovie = movie;
                },
                error: (err) => {
                    this.showErrorMessageUseCase.execute({
                        summary: err.error.message,
                        detail: '',
                    });

                    if (
                        err.status === 401 &&
                        err.error.message === 'Token is expired.'
                    ) {
                        this.logoutUserUseCase.execute();
                        this.navigateToStartPageUseCase.execute();
                    }

                    this.isLoading = false;
                },
            });
    };
}
