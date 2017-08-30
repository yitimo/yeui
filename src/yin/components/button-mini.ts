import { Component, Input, ViewEncapsulation } from '@angular/core';
// tslint:disable:max-line-length
@Component({
    selector: 'ye-button-mini',
    template: `
        <a href="javascript:void(0)" class="weui-btn mini" [ngClass]="{
            'primary': color === 'primary',
            'default': color !== 'primary' && color !== 'warn',
            'warn': color === 'warn',
            'disabled': disabled,
            'loading': loading
        }">
            <i class="weui-loading" *ngIf="loading"></i>
            <span><ng-content></ng-content></span>
        </a>
        `,
    styles: [`
        .weui-btn{
            position: relative;
            display: block;
            margin-left: auto;
            margin-right: auto;
            padding-left: 14px;
            padding-right: 14px;
            box-sizing: border-box;
            font-size: 18px;
            text-align: center;
            text-decoration: none;
            color: #FFFFFF;
            line-height: 2.55555556;
            border-radius: 5px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            overflow: hidden;
            transition: 0.3s;
        }
        .weui-btn.mini {
            display: inline-block;
            padding: 0 1.32em;
            line-height: 2.3;
            font-size: 13px;
        }
        .weui-btn:active:not(.disabled){
            opacity: 0.8;
        }
        .weui-btn:after {
            content: " ";
            width: 200%;
            height: 200%;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid rgba(0, 0, 0, 0.2);
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            box-sizing: border-box;
            border-radius: 10px;
        }
        .primary{
            background-color: #1AAD19;
        }
        .primary:not(.disabled):visited{
            color: #FFFFFF;
        }
        .loading.primary{
            background-color: #179B16;
        }
        .disabled.primary{
            background-color: #9ED99D;
        }
        .default{
            color: #000000;
            background-color: #F8F8F8;
        }
        .default:not(.disabled):visited{
            color: #000000;
        }
        .loading.default{
            color: #000000;
            background-color: #F8F8F8;
        }
        .disabled.default{
            color: rgba(0, 0, 0, 0.3);
            background-color: #F7F7F7;
        }
        .warn{
            background-color: #E64340;
        }
        .warn:not(.disabled):visited{
            color: #FFFFFF;
        }
        .loading.warn{
            background-color: #CE3C39;
        }
        .disabled.warn{
            background-color: #EC8B89;
        }
        .loading {
            color: rgba(255, 255, 255, 0.6);
        }
        .disabled{
            color: rgba(255, 255, 255, 0.6);
        }
        .weui-loading {
            margin: -0.2em 0.34em 0 0;
        }
        .weui-loading {
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
            -webkit-animation: weuiLoading 1s steps(12, end) infinite;
                    animation: weuiLoading 1s steps(12, end) infinite;
            background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
            background-size: 100%;
        }
        i, cite, em, var, address, dfn {
            font-style: italic;
        }
        @-webkit-keyframes weuiLoading {
            0% {
              -webkit-transform: rotate3d(0, 0, 1, 0deg);
                      transform: rotate3d(0, 0, 1, 0deg);
            }
            100% {
              -webkit-transform: rotate3d(0, 0, 1, 360deg);
                      transform: rotate3d(0, 0, 1, 360deg);
            }
          }
          @keyframes weuiLoading {
            0% {
              -webkit-transform: rotate3d(0, 0, 1, 0deg);
                      transform: rotate3d(0, 0, 1, 0deg);
            }
            100% {
              -webkit-transform: rotate3d(0, 0, 1, 360deg);
                      transform: rotate3d(0, 0, 1, 360deg);
            }
          }
    `]
})
export class ButtonMiniComponent {
    @Input() public loading: boolean;
    @Input() public color: string;
    @Input() public disabled: boolean;
    constructor() {
        this.loading = false;
        this.color = 'default';
        this.disabled = false;
    }
}
