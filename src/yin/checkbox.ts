import {
    Component, OnInit, forwardRef, HostBinding, HostListener,
    Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef,
    Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextUniqueId = 0;
// tslint:disable:member-ordering

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => CheckBoxComponent),
    multi: true
};

/**
 * <ye-checkbox [(ngModel)]="" [checked]="" (change)="">value<ye-checkbox>
 */
@Component({
    selector: 'ye-checkbox',
    template: `
        <label [attr.for]="forA" class="weui-cell weui-check__label">
        <div class="weui-cell__hd"><input [id]="forA" type="checkbox" (change)="ignoreInputChange($event)"
        (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
        <div class="weui-cell__bd"><p style="margin: 0;"><ng-content></ng-content></p></div>
        </label>
    `,
    providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class CheckBoxComponent implements ControlValueAccessor {
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
    public forA: string = `ye-checkbox-${++nextUniqueId}`;
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
