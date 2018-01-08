import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { DIALOG_DATA, DialogConfig } from '../base/common';
import { DialogRef } from './dialog.ref';

@Component({
    template: `
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{data?.title || '消息'}}</strong></div>
        <div class="weui-dialog__bd">{{data?.body || ' '}}</div>
        <div class="weui-dialog__ft">
            <div class="weui-dialog__btn weui-dialog__btn_default" (click)="close(false)" *ngIf="data?.showCancel">{{data?.no || '取消'}}</div>
            <div class="weui-dialog__btn weui-dialog__btn_primary" (click)="close(true)">{{data?.ok || '确认'}}</div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
    constructor(
        @Inject(DIALOG_DATA) public data: any,
        private dialog: DialogRef<DialogComponent>
    ) {}
    public close(ok?: boolean) {
        this.dialog.close(!!ok);
    }
}
