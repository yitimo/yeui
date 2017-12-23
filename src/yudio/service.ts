import { Injectable } from '@angular/core';
import { Audio, PLayData } from './model';

@Injectable()
export class AudioService {
    private _audio: HTMLAudioElement;
    private playList: Audio[];
    private playData: PLayData;
    private dataInterval: number;
    constructor() {
        this.audioInit();
        this.serviceInit();
    }
    public Toggle(audio?: Audio): void {
        const tryGet = audio ?
            this.playList.findIndex((p) => p.Src === audio.Src) :
            this.playData.Index;
        if (tryGet < 0) {
            this.playList.push(audio!);
            this.PlayIndex(this.playList.length);
        } else {
            if (tryGet === this.playData.Index) {
                if (this._audio.paused) {
                    this._audio.play();
                    this.playData.Playing = true;
                } else {
                    this._audio.pause();
                    this.playData.Playing = false;
                }
            } else {
                this.PlayIndex(tryGet);
            }
        }
    }
    public Add(audio: Audio): void {
        this.playList.push(audio);
        if (this.playList.length === 1) {
            this.PlayIndex(0);
        }
    }
    public Remove(index: number): void {
        this.playList.splice(index, 1);
        if (!this.playList.length) {
            this._audio.src = '';
        } else {
            if (index === this.playData.Index) {
                this.PlayIndex(index);
            }
        }
    }
    public Next(): void {
        switch (this.playData.Order) {
            case 0:
                if (this.playData.Index < this.playList.length - 1) {
                    this.playData.Index++;
                    this.PlayIndex(this.playData.Index);
                }
                break;
            case 3:
                this.playData.Index = (this.playData.Index + 1) % this.playList.length;
                this.PlayIndex(this.playData.Index);
                break;
            case 2:
                this.playData.Index = (this.playData.Index + 1) % this.playList.length;
                this.PlayIndex(this.playData.Index);
                console.log('暂不考虑随机播放将视为列表循环播放');
                break;
            case 1:
                this._audio.currentTime = 0;
                break;
            default:
                if (this.playData.Index < this.playList.length) {
                    this.playData.Index++;
                    this.PlayIndex(this.playData.Index);
                }
                break;
        }
    }
    public Prev(): void {
        switch (this.playData.Order) {
            case 0:
                if (this.playData.Index > 0) {
                    this.playData.Index--;
                    this.PlayIndex(this.playData.Index);
                }
                break;
            case 3:
                this.playData.Index = (this.playData.Index - 1) < 0 ?
                    (this.playList.length - 1) :
                    (this.playData.Index - 1);
                this.PlayIndex(this.playData.Index);
                break;
            case 2:
                this.playData.Index = (this.playData.Index - 1) < 0 ?
                    (this.playList.length - 1) :
                    (this.playData.Index - 1);
                this.PlayIndex(this.playData.Index);
                console.log('暂不考虑随机播放将视为列表循环播放');
                break;
            case 1:
                this._audio.currentTime = 0;
                break;
            default:
                if (this.playData.Index > 0) {
                    this.playData.Index--;
                    this.PlayIndex(this.playData.Index);
                }
                break;
        }
    }
    public Skip(percent: number): void {
        this._audio.currentTime = this._audio.duration * percent;
        this.playData.Progress = this._audio.currentTime;
    }
    public PlayIndex(index: number): void {
        index = this.playList[index] ? index :
            this.playList[index + 1] ? (index + 1) :
                this.playList[index - 1] ? (index - 1) : -1;
        if (index !== -1) {
            this._audio.src = this.playList[index].Src;
            if (this._audio.paused) {
                this._audio.play();
                this.playData.Playing = true;
            }
            this.playData.Index = index;
        } else {
            console.log('nothing to be play');
        }
    }
    public PlayList(): Audio[] {
        return this.playList;
    }
    public PlayData(): {
        Playing: boolean,
        Progress: number, // 当前时长
        Order: number; // 播放顺序
        Index: number, // 当前播放的索引
        Data: number // 加载的数据(时间)
    } {
        return this.playData;
    }
    public CurrentAudio(): any {
        return this.playList[this.playData.Index] || {};
    }
    public BookError(callback: any) {
        this._audio.onerror = callback || ((err) => {
            console.log(err);
        });
    }
    private serviceInit(): void {
        this.playList = [];
        this.playData = {
            Playing: false,
            Index: -1,
            Progress: -1,
            Order: 0,
            Data: 0
        };
    }
    private audioInit() {
        this._audio = new Audio();
        this._audio.autoplay = false;
        this._audio.onloadedmetadata = () => {
            this.playList[this.playData.Index].Duration = this._audio.duration;
        };
        this._audio.onplay = () => {
            this.dataInterval = window.setInterval(() => {
                this.playData.Progress = this._audio.currentTime;
                this.playData.Data = this._audio.buffered && this._audio.buffered.length ?
                    (this._audio.buffered.end(0) || 0) : 0;
            }, 1000);
            this.playData.Playing = true;
        };
        this._audio.onpause = () => {
            window.clearInterval(this.dataInterval);
            this.playData.Playing = false;
            this.playData.Progress = this._audio.currentTime;
        };
        this._audio.onended = () => {
            window.clearInterval(this.dataInterval);
            this.playData.Playing = false;
            this.playData.Progress = this.playData.Data =
            this.playList[this.playData.Index].Duration || 0;
        };
        this._audio.onabort = () => {
            window.clearInterval(this.dataInterval);
            this.playData.Playing = false;
            this.playData.Progress = this.playData.Data = 0;
        };
    }
}
