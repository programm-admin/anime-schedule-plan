import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPBase } from '../../../_components/comp-base/comp-base';

@Component({
    selector: 'app-comp-create-movie-page',
    imports: [],
    templateUrl: './comp-create-movie-page.html',
    styleUrl: './comp-create-movie-page.scss',
})
export class COMPCreateMoviePage extends COMPBase implements OnInit {
    // input variables

    public movieForm: FormGroup | null = null;

    constructor(private formBuilder: FormBuilder) {
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
}
