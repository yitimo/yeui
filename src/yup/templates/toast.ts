import { Component, Input, Inject, Injector, ViewContainerRef, ComponentRef, Self, ViewEncapsulation } from '@angular/core';
import { YupRef, YUP_DATA } from '../popup.ref';
import { toast } from '../animations';

@Component({
    selector: 'yup-toast',
    template: `
        <div class="yup-toast" [@toast]="disp">{{data?.msg || ''}}</div>
    `,
    animations: [toast],
    styles: [`
        .yup-toast{
            transition: 0.3s;
            position: fixed;
            max-width: 300px;
            max-height: 500px;z-index: 99;
            overflow: hidden;text-align: center;padding: 0.5em 1.3em;
            font-size: 16px;color: #fff;background: #000;opacity: 0.8;
            bottom: 10%;left: 50%;
            -webkit-transform: translate(-50%, 0);
            -moz-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            transform: translate(-50%, 0);border-radius: 3px;
        }
    `]
})
export class ToastComponent {
    public data: {
        msg?: string,
        duration?: number
    };
    public dialogRef: YupRef<ToastComponent>;
    public disp: string;
    constructor(
        private injector: Injector
    ) {
        this.data = this.injector.get(YUP_DATA);
        this.dialogRef = this.injector.get(YupRef);
        this.disp = 'init';
        setTimeout(() => {
            this.disp = 'on';
            setTimeout(() => {
                this.close();
            }, this.data.duration || 2000);
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
