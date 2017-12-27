import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { DIALOG_DATA, DialogConfig } from '../base/common';
import { DialogRef } from './dialog.ref';

@Component({
    template: `
        <div class="yup-body-head">{{data?.title || '消息'}}</div>
        <div class="yup-body-content">{{data?.body || ' '}}</div>
        <div class="yup-body-btns">
            <div class="btn default" (click)="close(false)" *ngIf="data?.showCancel">{{data?.no || '取消'}}</div>
            <div class="btn primary" (click)="close(true)">{{data?.ok || '确认'}}</div>
        </div>
    `,
    encapsulation: ViewEncapsulation.Native,
    styles: [`
        .yup-body-head {
            padding: 1.3em 1.6em 0.5em;
            font-weight: 400;font-size: 18px;
        }
        .yup-body-content {
            padding: 0 1.6em 0.8em;
            min-height: 40px;font-size: 15px;
            line-height: 1.3;word-wrap: break-word;
            word-break: break-all;color: #999999;
        }
        .yup-body-btns{
            position: relative;line-height: 48px;font-size: 18px;
            display: -webkit-box;display: -webkit-flex;display: flex;
        }
        .yup-body-btns:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .yup-body-btns .btn{
            display: block;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            text-decoration: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            position: relative;
        }
        .yup-body-btns .btn:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            bottom: 0;
            border-left: 1px solid #D5D5D6;
            color: #D5D5D6;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleX(0.5);
            transform: scaleX(0.5);
        }
        .yup-body-btns .btn.default{
            color: #353535;
        }
        .yup-body-btns .btn.primary{
            color: #0BB20C;
        }
    `]
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
