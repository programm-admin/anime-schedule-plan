import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPBase } from '../../../_components/comp-base/comp-base';
import { COMPMovieForm } from '../../../_components/comp-movie-form/comp-movie-form';
import { TF_Movie } from '../../../../core/models/movie.model';
import { UC_Message_ShowSuccessMessage } from '../../../../core/use-cases/message/show-success-message.use-case';
import { UC_Message_ShowErrorMessage } from '../../../../core/use-cases/message/show-error-message.use-case';
import { UC_Movie_CreateMovie } from '../../../../core/use-cases/movie/create-movie.use-case';
import { takeUntil } from 'rxjs';
import { TF_MediaReturnMessageForObjectCreation } from '../../../../shared/types/media/media-return.type';
import { UC_Navigation_NavigateToStartPage } from '../../../../core/use-cases/navigation/navigate-to-start-page.use-case';
import { UC_User_LogoutUser } from '../../../../core/use-cases/user/logout-user.use-case';
import { UC_Navigation_NavigateToPage } from '../../../../core/use-cases/navigation/navigate-to-page.use-case';
import { APP_ROUTES } from '../../../../shared/constants/app-routes';

@Component({
    selector: 'app-comp-create-movie-page',
    imports: [COMPMovieForm],
    templateUrl: './comp-create-movie-page.html',
    styleUrl: './comp-create-movie-page.scss',
    providers: [
        UC_Message_ShowSuccessMessage,
        UC_Movie_CreateMovie,
        UC_Navigation_NavigateToStartPage,
        UC_Navigation_NavigateToPage,
        UC_User_LogoutUser,
    ],
})
export class COMPCreateMoviePage extends COMPBase implements OnInit {
    public movieForm: FormGroup | null = null;
    public isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private readonly showSuccessMessageUseCase: UC_Message_ShowSuccessMessage,
        private readonly showErrorMessageUseCase: UC_Message_ShowErrorMessage,
        private readonly createMovieUseCase: UC_Movie_CreateMovie,
        private readonly navigateToStartPageUseCase: UC_Navigation_NavigateToStartPage,
        private readonly navigateToPageUseCase: UC_Navigation_NavigateToPage,
        private readonly logoutUserUseCase: UC_User_LogoutUser
    ) {
        super();
    }

    ngOnInit(): void {
        this.movieForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: '',
            plannedAirDate: [new Date(), Validators.required],
            realAirDate: [new Date(), Validators.required],
            watched: [false, Validators.required],
            rating: null,
            notes: '',
        });
    }

    public submitForm = (movie: TF_Movie) => {
        this.isLoading = true;

        this.createMovieUseCase
            .execute(movie)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: TF_MediaReturnMessageForObjectCreation) => {
                    this.showSuccessMessageUseCase.execute({
                        summary: response.message,
                        detail: '',
                    });
                    this.isLoading = false;
                    this.navigateToPageUseCase.execute(
                        `${APP_ROUTES['MOVIE'].url}/${response.id}`
                    );
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

    public cancelForm = () => {
        this.navigateToStartPageUseCase.execute();
    };
}
