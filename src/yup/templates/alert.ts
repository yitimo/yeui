import { Component, Input, Inject, Injector, ViewContainerRef, ComponentRef, Self, ViewEncapsulation } from '@angular/core';
import { YupRef, YUP_DATA } from '../popup.ref';
import { mask, dialog } from '../animations';

@Component({
    selector: 'yup-alert',
    template: `
        <div class="yup-mask" [@mask]="disp" (click)="!data?.mask && close()"></div>
        <div class="yup-body" [@dialog]="disp" *ngIf="disp">
            <div class="yup-body-head">{{data?.title || '消息'}}</div>
            <div class="yup-body-content">{{data?.msg || ' '}}</div>
            <div class="yup-body-btns">
                <div class="btn primary" (click)="close()">{{data?.ok || '确认'}}</div>
            </div>
        </div>
    `,
    styles: [`
        .yup-mask{
            background: #000000;
            opacity: 0;position: fixed;
            z-index: 90;
            left: 0;top: 0;right: 0;bottom: 0;
            transition: 0.3s;
        }
        .yup-body{
            transition: 0.3s;
            z-index: 91;
            width: 80%;max-width: 300px;
            position: fixed;top: 50%;left: 50%;
            -webkit-transform: translate(-50%, -50%) scale(1);
            -moz-transform: translate(-50%, -50%) scale(1);
            -ms-transform: translate(-50%, -50%) scale(1);
            -o-transform: translate(-50%, -50%) scale(1);
            transform: translate(-50%, -50%) scale(1);
            background-color: #ffffff;
            text-align: center;border-radius: 3px;
            overflow: hidden;
        }
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
    `],
    animations: [mask, dialog]
})
export class AlertComponent {
    public data: {
        title?: string,
        msg?: string,
        ok?: string,
        mask?: string
    };
    public dialogRef: YupRef<AlertComponent>;
    public disp: string;
    constructor(
        private injector: Injector
    ) {
        this.data = this.injector.get(YUP_DATA);
        this.dialogRef = this.injector.get(YupRef);
        this.disp = 'init';
        setTimeout(() => {
            this.disp = 'on';
        });
    }
    public close() {
        this.disp = 'off';
        setTimeout(() =>  {
            this.disp = 'init';
            this.dialogRef.close();
        }, 300);
    }
}
