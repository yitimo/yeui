import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DialogConfig } from '../yup.service';
import { mask, dialog } from '../yup.animation';

@Component({
    selector: 'yup-custom',
    template: `
        <div class="yup-mask" [@mask]="disp" *ngIf="disp" (click)="config.no()"></div>
        <div class="yup-custom" *ngIf="disp" [@mask]="disp" [innerHTML]="config?.content || ''" (click)="config.no()"></div>
    `,
    animations: [mask],
    encapsulation: ViewEncapsulation.None
})
export class CustomComponent {
    @Input() public disp: boolean;
    @Input() public config: any;
}
