import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { LOAD_DATA, LoadConfig } from '../base/common';
import { LoadRef } from './load.ref';
@Component({
    template: `
        <i [ngClass]="config?.type === 'load' ? 'weui-loading' : 'weui-icon-success-no-circle'" class="weui-icon_toast"></i>
        <p class="weui-toast__content">{{config?.body || ''}}</p>
    `,
    encapsulation: ViewEncapsulation.None
})
export class LoadComponent {
    constructor(
        @Inject(LOAD_DATA) public config: LoadConfig,
        private load: LoadRef<LoadComponent>
    ) {
        if (config.duration) {
            setTimeout(() => {
                load.close();
            }, config.duration || 2000);
        }
    }
}
