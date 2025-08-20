import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { COMPBase } from '../../../_components/comp-base/comp-base';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-comp-movie-details-page',
    imports: [],
    templateUrl: './comp-movie-details-page.html',
    styleUrl: './comp-movie-details-page.scss',
    providers: [],
})
export class COMPMovieDetailsPage extends COMPBase implements OnInit {
    public currentId: string | null = null;

    constructor(private route: ActivatedRoute) {
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

    public loadMovie = (movieId: string) => {};
}
