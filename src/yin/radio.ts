import {
    Component, OnInit, forwardRef, HostBinding, HostListener,
    Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef,
    Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextUniqueId = 0;
// tslint:disable:member-ordering

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => RadioComponent),
    multi: true
};

/**
 * <ye-radio [(ngModel)]="" [checked]="" (change)="">value<ye-radio>
 */
@Component({
    selector: 'label[ye-radio]',
    template: `
        <div class="weui-cell__bd"><p style="margin: 0;"><ng-content></ng-content></p></div>
        <div class="weui-cell__ft"><input [id]="forA" type="radio" (change)="ignoreInputChange($event)"
        (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
    `,
    providers: [RADIO_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class RadioComponent implements ControlValueAccessor {
    @Input() get checked() {
        return this._checked;
    }
    set checked(checked: boolean) {
        if (checked !== this.checked) {
            this._checked = checked;
            this._changeDetectorRef.markForCheck();
        }
    }
    @Output() public change: EventEmitter<boolean> = new EventEmitter<boolean>();
    private _checked: boolean = false;
    @HostBinding('attr.for') public forA: string = `ye-checkbox-${++nextUniqueId}`;
    @HostBinding('class.weui-cell') public baseC1: boolean = true;
    @HostBinding('class.weui-check__label') public baseC2: boolean = true;
    private _controlValueAccessorChangeFn: (value: any) => void = () => {
        //
    }
    private onTouched: () => any = () => {
        //
    }
    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) {}
    public writeValue(value: any) {
        this.checked = !!value;
    }
    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    public registerOnChange(fn: (value: any) => void) {
        this._controlValueAccessorChangeFn = fn;
    }
    public ignoreInputChange(event: Event) {
        event.stopPropagation();
    }
    public ignoreInputClick(event: Event) {
        event.stopPropagation();
        this.checked = !this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(this.checked);
    }
}
