import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { YUPService, DialogConfig, LoadConfig } from './yup.service';
import { mask, dialog, toast } from './yup.animation';
// tslint:disable:max-classes-per-file

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
    @Input() public config: DialogConfig;
    @Input() public mask: boolean;
    @Input() public flex: boolean;
}

@Component({
    selector: 'yup-alert',
    template: `
        <div class="yup-mask" [@mask]="disp" *ngIf="disp && mask" (click)="flex && config.no()"></div>
        <div class="yup-body" [@dialog]="disp" *ngIf="disp">
            <div class="yup-body-head">{{config?.title || '消息'}}</div>
            <div class="yup-body-content">{{config?.msg || ' '}}</div>
            <div class="yup-body-btns">
                <div class="btn primary" (click)="config.ok()">{{config?.okStr || '确认'}}</div>
            </div>
        </div>
    `,
    animations: [mask, dialog],
    encapsulation: ViewEncapsulation.None
})
export class AlertComponent {
    @Input() public disp: boolean;
    @Input() public config: DialogConfig;
    @Input() public mask: boolean;
    @Input() public flex: boolean;
}

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
    @Input() public config: LoadConfig;
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
