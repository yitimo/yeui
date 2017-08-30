import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * mask: 出现遮罩 必须点击确定或取消才能关闭
 * mask_sync: 出现遮罩且确定或取消的回调位同步执行完成后才会关闭
 * flex: 出现遮罩但点击遮罩会执行取消回调
 * flex_sync: 出现遮罩但点击遮罩会执行取消回调 点击确定会同步执行完成后才会关闭
 * none: 不显示遮罩
 * none_sync: 不显示遮罩但确定的回调同步执行完毕才会关闭
 */

// tslint:disable:no-empty
@Injectable()
export class YUPService {
    private _config: any;
    private _disp: any;
    private loading: boolean;
    constructor(
        private sanitized: DomSanitizer
    ) {
        this.loading = false;
        this._config = {
            dialog: {},
            alert: {},
            load: {},
            toast: {},
            custom: {}
        };
        this._disp = {
            dialog: false,
            alert: false,
            load: false,
            toast: false,
            custom: false
        };
    }
    public Dialog(config: {
        ok?: () => Promise<any> | any,
        no?: () => any,
        mask?: string,
        msg?: string,
        title?: string,
        okStr?: string,
        noStr?: string
    }) {
        this._config.dialog.mask = config.mask || 'mask';
        this._config.dialog.msg = config.msg || ' ';
        this._config.dialog.ok = () => {
            if (this.sync(config.mask) && config.ok) {
                config.ok().then(() => {
                    this._disp.dialog = false;
                });
            } else if (config.ok) {
                config.ok();
                this._disp.dialog = false;
            } else {
                this._disp.dialog = false;
            }
        };
        this._config.dialog.no = () => {
            if (config.no) {
                config.no();
            }
            this._disp.dialog = false;
        };
        this._config.dialog.noStr = config.noStr || '取消';
        this._config.dialog.okStr = config.okStr || '确定';
        this._config.dialog.title = config.title || '消息';
        this._disp.dialog = true;
    }
    public Alert(config: {
        mask?: string,
        msg?: string,
        ok?: () => Promise<any> | any,
        no?: () => any,
        okStr?: string,
        title?: string
    }) {
        this._config.alert.mask = config.mask || 'mask';
        this._config.alert.msg = config.msg || ' ';
        this._config.alert.ok = () => {
            if (this.sync(config.mask) && config.ok) {
                config.ok().then(() => {
                    this._disp.alert = false;
                });
            } else if (config.ok) {
                config.ok();
                this._disp.alert = false;
            } else {
                this._disp.alert = false;
            }
        };
        this._config.alert.no = () => {
            if (config.no) {
                config.no();
            }
            this._disp.alert = false;
        };
        this._config.alert.okStr = config.okStr || '确定';
        this._config.alert.title = config.title || '消息';
        this._disp.alert = true;
    }
    public Custom(dom: string) {
        if (typeof dom !== 'string') {
            dom = '';
        }
        this._config.custom.content = this.sanitized.bypassSecurityTrustHtml(dom || '');
        this._config.custom.no = () => {
            this._disp.custom = false;
        };
        this._disp.custom = true;
    }
    public CustomHide() {
        this._disp.custom = false;
    }
    public Load(config: {
        mask?: string,
        delay?: number,
        duration?: number,
        msg?: string
    }) {
        this._config.load.msg = config.msg || '加载中';
        this._config.load.mask = config.mask || 'mask';
        this._config.load.delay = config.delay || 0;
        this._config.load.duration = config.duration || 0;
        this._config.load.type = 'load';
        if (this._config.load.duration) {
            this.loading = true;
            setTimeout(() => {
                if (this.loading) {
                    this._disp.load = true;
                }
            }, this._config.load.duration);
        } else {
            this._disp.load = true;
        }
    }
    public Loaded() {
        this.loading = false;
        this._disp.load = false;
    }
    public Toast(config: {
        msg?: string,
        delay?: number
    }) {
        this._config.toast.msg = config.msg || ' ';
        this._config.toast.delay = config.delay || 2000;
        this._disp.toast = true;
        setTimeout(() => {
            this._disp.toast = false;
        }, this._config.toast.delay);
    }
    public Config() {
        return this._config;
    }
    public Disp() {
        return this._disp;
    }
    public Flex(type: string) {
        if (!this._config[type]) {
            return false;
        }
        switch (this._config[type].mask) {
            case 'flex':
            case 'flex_sync':
            return true;
            default:
            return false;
        }
    }
    public Mask(type: string) {
        if (!this._config[type]) {
            return false;
        }
        switch (this._config[type].mask) {
            case 'none':
            case 'none_sync':
            return false;
            default:
            return true;
        }
    }
    private sync(mask: string) {
        switch (mask) {
            case 'mask_sync':
            case 'flex_sync':
            case 'none_sync':
            return true;
            default:
            return false;
        }
    }
}
