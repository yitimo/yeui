// tslint:disable:max-line-length
// tslint:disable:max-classes-per-file
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AudioService } from './service';
import { Audio } from './model';

@Component({
    selector: 'ytm-audio',
    template: `
        <div class="yudio-body">
            <ytm-audio-ctrl style="position: absolute;left: 0;top: 0;"
                [data]="data" [theme]="themes[2]" [cover]="!!cover" [size]="['1.9rem', '1.9rem']">
            </ytm-audio-ctrl>
            <div class="info" [ngStyle]="{background: themes[0], color: themes[1]}">
                {{data.Title}}
            </div>
            <div class="ctrl" *ngIf="!!bar">
                <div class="data" (click)="Skip($event)"
                    [ngStyle]="{'width': audio.PlayData().Data / audio.CurrentAudio().Duration * 100 + '%'}">
                </div>
                <div class="current" (click)="Skip($event)"
                    [ngStyle]="{'background': themes[3], 'width': audio.PlayData().Progress / audio.CurrentAudio().Duration * 100 + '%'}">
                </div>
                <div class="bar" (click)="Skip($event)"
                    [ngStyle]="{'left': audio.PlayData().Progress / audio.CurrentAudio().Duration * 100 + '%'}">
                </div>
                <div class="time" *ngIf="audio.PlayData().Src">
                    {{audio.PlayData().Current | ytmTime}}
                </div>
            </div>
        </div>`,
    styles: [`
        .yudio-body{
            margin: 0.2rem;border: 1px solid #ddd;
            position: relative;
        }
        .info{
            font-size: 0.4rem;color: #666;height: 1.8rem;
            padding: 0.3rem 0.2rem;margin-left: 1.9rem;
        }
        .ctrl{
            height: 0.1rem;margin-left: 2rem;background: #ddd;
            border-radius: 0.1rem;position: relative;
        }
        .ctrl > .data{
            position: absolute;top: 0;height: 0.1rem;
            z-index: 3;background: #a2ffaa;left: 0;border-radius: 0.1rem;
        }
        .ctrl > .current{
            position: absolute;top: 0;height: 0.1rem;
            border-radius: 0.1rem;z-index:4;left: 0;
        }
        .ctrl > .bar{
            position: absolute;top: -0.1rem;background: #fff;
            box-shadow: 0 0 1px #666;height: 0.3rem;width: 0.3rem;
            border-radius: 0.1rem;z-index: 5;margin-left: -0.15rem;
        }
        .ctrl > .time{
            position: absolute;top: -0.8rem;
            left: 0.2rem;z-index: 5;color: #999;font-size: 0.4rem;
        }
    `]
})
export class AudioComponent implements OnChanges {
    @Input() public data: Audio;
    @Input() public themes: string[]; // [背景色 字色 ctrl色 bar色]
    @Input() public cover: boolean;
    @Input() public bar: boolean;
    constructor(
        public audio: AudioService
    ) {
        this.themes = ['#fff', '#000', '#fbb73d', '#fbb73d'];
        this.cover = true;
        this.bar = true;
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.themes && changes.themes.currentValue.length) {
            this.themes = [
                changes.themes.currentValue[0] || '#fff',
                changes.themes.currentValue[1] || '#000',
                changes.themes.currentValue[2] || '#fbb73d',
                changes.themes.currentValue[3] || '#fbb73d'
            ];
        }
    }
    public Skip(e: any) {
        this.audio.Skip(e.layerX / e.srcElement.offsetParent.getBoundingClientRect().width);
    }
}

@Component({
    selector: 'ytm-audio-ctrl',
    template: `
        <div class="btn" [ngStyle]="{ 'background-size': 'cover', 'background-color': theme, 'width': size[0], 'height': size[1], 'background-image': 'url(' + (cover ? data.Cover : '') + ')'}">
            <div class="mask" *ngIf="cover"></div>
            <img (click)="audio.Toggle(data)"
                src="{{audio.PlayList()[audio.PlayData().Index]?.Src === data.Src && audio.PlayData().Playing ?
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNmMxYzIwMC1iZWU3LWQ2NGMtYjJlYy02OTcwMzFkOWI0ZDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUZENDNCQ0FFQjhFMTFFNjkzRDBDMkM4Rjk2NjhDMkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUZENDNCQzlFQjhFMTFFNjkzRDBDMkM4Rjk2NjhDMkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWM4NmYyZWUtNTBhNi0xZDQ1LWI0OWQtYmFiZWMyNWM3MmIxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTdhMzgyMjktZWI4ZC0xMWU2LWJiYTgtOWYyNTFiODkyNGMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ugkmxgAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAA3ElEQVR42uzdAQ3AMAwDQZc/6VFYpWZRujOAjw5Bsi5ZQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQC6GZGsdwXeQnL6bnJcUnE1DsQaSr4MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAggyENxaZHKgXFf722GTEQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBCQoXsEGABPwWjQHvF3uQAAAABJRU5ErkJggg==' :
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNmMxYzIwMC1iZWU3LWQ2NGMtYjJlYy02OTcwMzFkOWI0ZDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjY1RDlBQzhFQjhFMTFFNkE1QTlFNTA4RTgyQTBGQ0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjY1RDlBQzdFQjhFMTFFNkE1QTlFNTA4RTgyQTBGQ0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWM4NmYyZWUtNTBhNi0xZDQ1LWI0OWQtYmFiZWMyNWM3MmIxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTdhMzgyMjktZWI4ZC0xMWU2LWJiYTgtOWYyNTFiODkyNGMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HQvMhAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAB+UlEQVR42uzdyXHEQAxDUf78k/bV5WUWDbsbhIAM3k0SUUJhkgokkEACCSSQQAIJJJBAAgkkkEACCSSQQIZB6nsGQ+pHhkLqd0ZC6u+Mg9S/mQWpRxkEqSeZAqnbQA5SqtdxjtIPOUSpfscZyhrIAcoqyHZKIGqUlZCtlLWQjZTVkG2U9ZBNlB2QLZQ9kLKBlA1kOWUfZDFlJ2QpZS9kIWU3ZJklEDXKEcgKyiFIP+UYpJtyENJLOQrppASiRjkO6aIIQHooEpAOigjkc4oM5FNKIGoUKcgnFDHIdYoc5CpFEHKNIgm5QhGFlA3kbYoupGwg71GkIe9QxCGvU+Qhr1oCUaPMgLxAmQIpG8gzyiDIY8ooSAWiBikbSNlAKhA1SAUSSCCBBBJIIIEEEshdnn7zqhtIIDf4QGfyyTRnBSmIyaEnN0QpiMl52qQwYFLhSM1JCpIGnRTEpJxpUpe9VvuVg4AFBCwgEIgSBCwg4AChIQoQPCBgAQEPCB4QsICABQQsIOABwQMCHhA8IGABAQsIWEDAAgIWEAhECQIWELCAgAUELCBgAYFAlCBgAQEHCCeyYH8ECwin0rzRgwmEIRBkGZ3LYjAJgiijaUZQYUfwyr/FBBktC5WMhUgmkEACCSSQQAIJJJBAAgkkkEACCSSQQAI5mC8BBgCdnWqzQfoWBwAAAABJRU5ErkJggg=='
            }}" />
        </div>
    `,
    styles: [`
        .mask{
            height: 100%;width: 100%;background: #000;
            opacity: 0.5;left: 0;top: 0;
        }
        .btn{
            text-align: center;left: 0;top: 0;position: relative;
            text-align: center;
        }
        .btn > img{
            height: 0.6rem;width: 0.6rem;position: absolute;left: 50%;top: 50%;
            margin-left: -0.3rem;margin-top: -0.3rem;
        }
    `]
})
export class AudioCtrlComponent implements OnChanges {
    @Input() public data: Audio;
    @Input() public theme: string; // 背景色(无封面时会显示背景色)
    @Input() public size: string[];
    @Input() public cover: boolean;
    constructor(
        public audio: AudioService
    ) {
        this.theme = '#fff';
        this.cover = true;
        this.size = ['1.9rem', '1.9rem'];
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.size && changes.size.currentValue && changes.size.currentValue.length) {
            this.size = [
                changes.size.currentValue[0] || '1.9rem',
                changes.size.currentValue[1] || '1.9rem'
            ];
        }
    }
}
