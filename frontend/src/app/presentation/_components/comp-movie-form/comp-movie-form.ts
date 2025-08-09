import {
    Component,
    input,
    InputSignal,
    OnInit,
    output,
    OutputEmitterRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'stream';
import { TF_Movie } from '../../../core/models/movie.model';

@Component({
    selector: 'app-comp-movie-form',
    imports: [],
    templateUrl: './comp-movie-form.html',
    styleUrl: './comp-movie-form.scss',
})
export class COMPMovieForm implements OnInit {
    // input variables
    public inpMovieSeriesId: InputSignal<string> = input.required<string>();
    public inpSubmitForm: InputSignal<() => void> =
        input.required<() => void>();

    // output variables
    public outSubmitForm: OutputEmitterRef<TF_Movie> = output<TF_Movie>();
    public outCancelForm: OutputEmitterRef<boolean> = output<boolean>();

    public movieForm: FormGroup | null = null;
    public isFormSubmitted: boolean = false;

    constructor(private formBuilder: FormBuilder) {}

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

    public onSubmitForm = () => {
        this.isFormSubmitted = true;

        if (this.movieForm?.invalid) return;
    };
}
