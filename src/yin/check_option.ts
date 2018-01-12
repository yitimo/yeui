import {
    Component, forwardRef, HostBinding, Output, EventEmitter,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    Input, Optional
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioDirective } from './radio';

let nextUniqueId = 0;
// tslint:disable:member-ordering

export const OPTION_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => OptionComponent),
    multi: true
};

@Component({
    selector: 'label[ye-option]',
    template: `
    <div class="weui-cell__hd" *ngIf="type === 'checkbox'"><input [id]="id" type="checkbox" (change)="ignoreInputChange($event)"
    (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
    <div class="weui-cell__bd"><p style="margin: 0;"><ng-content></ng-content></p></div>
    <div class="weui-cell__ft" *ngIf="type === 'radio'"><input [id]="id" type="radio" (change)="ignoreInputChange($event)"
    (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
    `,
    providers: [OPTION_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class OptionComponent implements ControlValueAccessor {
    public type: string = '';
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
    @HostBinding('attr.for') public id: string = `ye-check-${++nextUniqueId}`;
    @HostBinding('class.weui-cell') public cellC: boolean = true;
    @HostBinding('class.weui-check__label') public labelA: boolean = true;
    private _controlValueAccessorChangeFn: (value: any) => void = () => {/* */};
    private onTouched: () => any = () => {/* */};
    private _checked: boolean = false;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        // @Optional() private radioD: RadioDirective
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
