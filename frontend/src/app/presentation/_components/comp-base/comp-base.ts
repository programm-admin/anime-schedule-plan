import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-comp-base',
    imports: [],
    templateUrl: './comp-base.html',
    styleUrl: './comp-base.scss',
})
export class COMPBase implements OnDestroy {
    protected readonly destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
