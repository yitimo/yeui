import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { mask, toast } from '../yup.animation';

@Component({
    selector: 'yup-toast',
    template: `
        <div class="yup-toast" *ngIf="disp" [@toast]="disp">{{config?.msg || ''}}</div>
    `,
    animations: [toast],
    encapsulation: ViewEncapsulation.None
})
export class ToastComponent {
    @Input() public disp: boolean;
    @Input() public config: any;
}
