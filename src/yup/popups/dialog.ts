import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { mask, dialog } from '../yup.animation';

@Component({
    selector: 'yup-dialog',
    template: `
        <div class="yup-mask" [@mask]="disp" *ngIf="disp && mask" (click)="flex && config.no()"></div>
        <div class="yup-body" [@dialog]="disp" *ngIf="disp">
            <div class="yup-body-head">{{config?.title || '消息'}}</div>
            <div class="yup-body-content">{{config?.msg || ' '}}</div>
            <div class="yup-body-btns">
                <div class="btn default" (click)="config.no()">{{config?.noStr || '取消'}}</div>
                <div class="btn primary" (click)="config.ok()">{{config?.okStr || '确认'}}</div>
            </div>
        </div>
    `,
    animations: [mask, dialog],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
    @Input() public disp: boolean;
    @Input() public config: any;
    @Input() public mask: boolean;
    @Input() public flex: boolean;
}
