import {
    Component,
    input,
    InputSignal,
    OnInit,
    output,
    OutputEmitterRef,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TF_Movie } from '../../../core/models/movie.model';
import { isFieldInvalid } from '../../../shared/functions/validate-form-field.functions';
import { UC_User_GetUser } from '../../../core/use-cases/user/get-user.use-case';
import { COMPBase } from '../comp-base/comp-base';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { RatingModule } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-comp-movie-form',
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        FloatLabel,
        ButtonModule,
        MessageModule,
        DatePickerModule,
        SelectModule,
        RatingModule,
        TextareaModule,
    ],
    templateUrl: './comp-movie-form.html',
    styleUrl: './comp-movie-form.scss',
    providers: [UC_User_GetUser],
})
export class COMPMovieForm extends COMPBase implements OnInit {
    // input variables
    public inpMovieSeriesId: InputSignal<string> = input<string>('');
    public inpIsDisabled: InputSignal<boolean> = input.required<boolean>();

    // output variables
    public outSubmitForm: OutputEmitterRef<TF_Movie> = output<TF_Movie>();
    public outCancelForm: OutputEmitterRef<boolean> = output<boolean>();

    public movieForm: FormGroup | null = null;
    public isFormSubmitted: boolean = false;
    public watchedSelection: { name: string; value: boolean }[] = [
        { name: 'geschaut', value: true },
        { name: 'nicht geschaut', value: false },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private readonly getUserUseCase: UC_User_GetUser,
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

    public checkFieldInvalid = (fieldName: string): boolean => {
        return isFieldInvalid(this.movieForm, fieldName, this.isFormSubmitted);
    };

    public onSubmitForm = () => {
        this.isFormSubmitted = true;

        const userAccountId: string | undefined =
            this.getUserUseCase.execute()?.user?.userAccountId;

        if (this.movieForm?.invalid || !userAccountId) return;

        this.getUserUseCase.execute();

        const newMovie: TF_Movie = {
            id: '', // is generated in backend
            userAccountId,
            title: this.movieForm?.get('title')?.value,
            description: this.movieForm?.get('description')?.value,
            plannedAirDate: this.movieForm?.get('plannedAirDate')?.value,
            realAirDate: this.movieForm?.get('realAirDate')?.value,
            watched: this.movieForm?.get('watched')?.value,
            rating: this.movieForm?.get('rating')?.value,
            notes: this.movieForm?.get('notes')?.value,
            movieSeriesId: this.inpMovieSeriesId(),
        };

        this.outSubmitForm.emit(newMovie);
        this.isFormSubmitted = false;
    };

    public cancelForm = () => {
        this.outCancelForm.emit(true);
    };
}
