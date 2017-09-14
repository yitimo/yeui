import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { mask, dialog } from '../yup.animation';

@Component({
    selector: 'yup-tip',
    template: `
        <div class="yup-mask-transparent" [@mask]="disp" *ngIf="disp && mask"></div>
        <div class="yup-tip" [@mask]="disp" *ngIf="disp">
            <i [ngClass]="icon(config.type)" class="yup-icon_tip"></i>
            <p class="yup-tip__content">{{config?.msg || ''}}</p>
        </div>
    `,
    animations: [mask],
    encapsulation: ViewEncapsulation.None
})
export class LoadComponent {
    @Input() public disp: boolean;
    @Input() public config: any;
    @Input() public mask: boolean;
    public icon(type: string) {
        switch (type) {
            case 'success':
            return 'yup-icon-success-no-circle';
            case 'load':
            default:
            return 'yup-loading';
        }
    }
}
