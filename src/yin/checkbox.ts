import {
    Component, forwardRef, HostBinding, Output, EventEmitter,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    Input, Optional, Directive, ContentChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextUniqueId = 0;

export const CHECKBOX_OPTION_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => CheckBoxOptionComponent),
    multi: true
};

@Directive({
    selector: 'div[ye-checkbox]'
})
export class CheckBoxDirective {
    /**
     * cells's ngModel bind defaultly for index of options
     * or you can set a value to those options for binding
     */
    @HostBinding('class.weui-cells') public cellsC: boolean = true;
    @HostBinding('class.weui-cells_checkbox') public checkboxC: boolean = true;
}

// tslint:disable-next-line:max-classes-per-file
@Component({
    selector: 'label[ye-checkbox-option]',
    template: `
    <div class="weui-cell__hd"><input [id]="id" type="checkbox" [attr.name]="name" (change)="ignoreInputChange($event)"
    (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
    <div class="weui-cell__bd"><p style="margin: 0;"><ng-content></ng-content></p></div>`,
    providers: [CHECKBOX_OPTION_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CheckBoxOptionComponent implements ControlValueAccessor {
    public type: string = '';
    get checked() {
        return this._checked;
    }
    set checked(checked: boolean) {
        if (checked !== this.checked) {
            this._checked = checked;
            this._changeDetectorRef.markForCheck();
        }
    }
    @Output() public change: EventEmitter<boolean> = new EventEmitter<boolean>();
    @HostBinding('attr.for') public id: string = `ye-checkbox-option-${++nextUniqueId}`;
    @Input() public name: string = this.id;
    @HostBinding('class.weui-cell') public cellC: boolean = true;
    @HostBinding('class.weui-check__label') public labelA: boolean = true;
    private _checked: boolean = false;
    constructor(
        public _changeDetectorRef: ChangeDetectorRef
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
    private _controlValueAccessorChangeFn: (value: any) => void = () => {/* */};
    private onTouched: () => any = () => {/* */};
}
