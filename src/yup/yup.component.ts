import { Component, ViewEncapsulation } from '@angular/core';
import { YUPService } from './yup.service';
// tslint:disable:max-line-length

@Component({
    selector: 'yup',
    template: `
        <yup-dialog [mask]="yup.Mask('dialog')" [flex]="yup.Flex('dialog')" [disp]="yup.Disp().dialog" [config]="yup.Config().dialog"></yup-dialog>
        <yup-alert [mask]="yup.Mask('alert')" [flex]="yup.Flex('alert')" [disp]="yup.Disp().alert" [config]="yup.Config().alert"></yup-alert>
        <yup-tip [mask]="yup.Mask('load')" [disp]="yup.Disp().load" [config]="yup.Config().load"></yup-tip>
        <yup-toast [disp]="yup.Disp().toast" [config]="yup.Config().toast"></yup-toast>
        <yup-custom [disp]="yup.Disp().custom" [config]="yup.Config().custom"></yup-custom>
    `,
    styleUrls: ['./yup.css'],
    encapsulation: ViewEncapsulation.None
})
export class YUPComponent {
    constructor(
        public yup: YUPService
    ) {}
}
