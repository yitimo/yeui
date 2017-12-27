import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { TOAST_DATA, ToastConfig } from '../base/common';
import { ToastRef } from './toast.ref';

@Component({
    template: `{{config?.body}}`,
    styles: [`
        .yup-toast{}
    `],
    encapsulation: ViewEncapsulation.Native
})
export class ToastComponent {
    constructor(
        @Inject(TOAST_DATA) public config: ToastConfig,
        private toast: ToastRef<ToastComponent>
    ) {
        setTimeout(() => {
            toast.close();
        }, config.duration || 2000);
    }
}
