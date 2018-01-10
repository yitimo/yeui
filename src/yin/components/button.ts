import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy,
    OnChanges, SimpleChanges, HostBinding
} from '@angular/core';
// tslint:disable:max-classes-per-file

@Component({
    selector: 'ye-button-plain',
    template: `<i class="weui-loading" *ngIf="loadingC"></i><ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlainButtonComponent implements OnChanges {
    @HostBinding('class.weui-btn') public btnC: boolean = true;
    @HostBinding('class.weui-btn_plain-default') public defaultC: boolean;
    @HostBinding('class.weui-btn_plain-loading') public loadingC: boolean;
    @HostBinding('class.weui-btn_plain-primary') public primaryC: boolean;
    @HostBinding('class.weui-btn_plain-disabled') public disabledC: boolean;
    @HostBinding('class.weui-btn_mini') public miniC: boolean;
    @Input() public default: boolean;
    @Input() public loading: boolean;
    @Input() public primary: boolean;
    @Input() public disabled: boolean;
    @Input() public mini: boolean;
    constructor() {
        this.default = this.defaultC = true;
        this.loading = this.loadingC = false;
        this.primary = this.primaryC = false;
        this.disabled = this.disabledC = false;
        this.mini = this.miniC = false;
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.mini && changes.mini.isFirstChange()) {
            this.miniC = changes.mini.currentValue !== false;
        }
        if (changes.loading && changes.loading.currentValue !== changes.loading.previousValue) {
            this.loadingC = changes.loading.currentValue !== false;
        }
        if (changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
            this.disabledC = changes.disabled.currentValue !== false;
        }
        if (changes.default && changes.default.currentValue !== changes.default.previousValue) {
            this.defaultC = changes.default.currentValue !== false;
            if (this.defaultC) {
                this.primaryC = false;
                return;
            }
        }
        if (changes.primary && changes.primary.currentValue !== changes.primary.previousValue) {
            this.primaryC = changes.primary.currentValue !== false;
            if (this.primaryC) {
                this.defaultC = false;
                return;
            }
        }
        if (!this.primaryC) {
            this.defaultC = true;
        }
    }
}

@Component({
    selector: 'ye-button',
    template: `<i class="weui-loading" *ngIf="loadingC"></i><ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnChanges {
    @HostBinding('class.weui-btn') public btnC: boolean = true;
    @HostBinding('class.weui-btn_default') public defaultC: boolean;
    @HostBinding('class.weui-btn_loading') public loadingC: boolean;
    @HostBinding('class.weui-btn_warn') public warnC: boolean;
    @HostBinding('class.weui-btn_primary') public primaryC: boolean;
    @HostBinding('class.weui-btn_disabled') public disabledC: boolean;
    @HostBinding('class.weui-btn_mini') public miniC: boolean;
    @Input() public default: boolean;
    @Input() public loading: boolean;
    @Input() public warn: boolean;
    @Input() public primary: boolean;
    @Input() public disabled: boolean;
    @Input() public mini: boolean;
    constructor() {
        this.default = this.defaultC = true;
        this.loading = this.loadingC = false;
        this.primary = this.primaryC = false;
        this.warn = this.warnC = false;
        this.disabled = this.disabledC = false;
        this.mini = this.miniC = false;
    }
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.mini && changes.mini.isFirstChange()) {
            this.miniC = changes.mini.currentValue !== false;
        }
        if (changes.loading && changes.loading.currentValue !== changes.loading.previousValue) {
            this.loadingC = changes.loading.currentValue !== false;
        }
        if (changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
            this.disabledC = changes.disabled.currentValue !== false;
        }
        if (changes.default && changes.default.currentValue !== changes.default.previousValue) {
            this.defaultC = changes.default.currentValue !== false;
            if (this.defaultC) {
                this.warnC = this.primaryC = false;
                return;
            }
        }
        if (changes.primary && changes.primary.currentValue !== changes.primary.previousValue) {
            this.primaryC = changes.primary.currentValue !== false;
            if (this.primaryC) {
                this.warnC = this.defaultC = false;
                return;
            }
        }
        if (changes.warn && changes.warn.currentValue !== changes.warn.previousValue) {
            this.warnC = changes.warn.currentValue !== false;
            if (this.warnC) {
                this.defaultC = this.primaryC = false;
                return;
            }
        }
        if (!this.primaryC && !this.warnC) {
            this.defaultC = true;
        }
    }
}
