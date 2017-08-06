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
    styles: [`
        body{
            font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
        }
        .yup-mask{
            background: #000000;
            opacity: 0.6;position: fixed;
            z-index: 90;
            left: 0;top: 0;right: 0;bottom: 0;
        }
        .yup-mask-transparent{
            background: none;
            position: fixed;
            z-index: 90;
            left: 0;top: 0;right: 0;bottom: 0;
        }
        .yup-custom{
            position: fixed;
            top: 0;left: 0;right: 0;bottom: 0;
            overflow: auto;z-index: 91;
        }
        .yup-toast{
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
        .yup-body{
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

        .yup-tip {
        position: fixed;
        z-index: 5000;
        width: 7.6em;
        min-height: 7.6em;
        top: 180px;
        left: 50%;
        margin-left: -3.8em;
        background: rgba(17, 17, 17, 0.7);
        text-align: center;
        border-radius: 5px;
        color: #FFFFFF;
        }
        .yup-icon_tip {
        margin: 22px 0 0;
        display: block;
        }
        .yup-icon-success-no-circle{
            font-size: 23px;
            color: #09BB07;
        }
        .yup-icon-success-no-circle:before{
            content: "\EA08";
        }
        .yup-icon_tip.yup-icon-success-no-circle:before {
            color: #FFFFFF;
            font-size: 55px;
        }
        .yup-icon_tip.yup-loading {
        margin: 30px 0 0;
        width: 38px;
        height: 38px;
        vertical-align: baseline;
        }
        .yup-tip__content {
        margin: 0 0 15px;
        }
        .yup-loading {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        -webkit-animation: yupLoading 1s steps(12, end) infinite;
                animation: yupLoading 1s steps(12, end) infinite;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
        background-size: 100%;
        }
        @-webkit-keyframes yupLoading {
        0% {
            -webkit-transform: rotate3d(0, 0, 1, 0deg);
                    transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 360deg);
                    transform: rotate3d(0, 0, 1, 360deg);
        }
        }
        @keyframes yupLoading {
        0% {
            -webkit-transform: rotate3d(0, 0, 1, 0deg);
                    transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 360deg);
                    transform: rotate3d(0, 0, 1, 360deg);
        }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class YUPComponent {
    constructor(
        public yup: YUPService
    ) {}
}
