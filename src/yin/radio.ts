import {
    Component, Directive, forwardRef, HostBinding, Output, EventEmitter,
    ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    Input, Optional, AfterContentInit, ContentChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextUniqueId = 0;

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => RadioDirective),
    multi: true
};

@Directive({
    selector: 'div[ye-radio]',
    providers: [RADIO_CONTROL_VALUE_ACCESSOR]
})
export class RadioDirective implements ControlValueAccessor {
    // @Input() public get name(): string { return this._name; }
    // public set name(value: string) {
    //     this._name = value;
    //     this._updateRadioOptionNames();
    // }
    // @Input() public get chosen(): any { return this._chosen; }
    // public set chosen(value: any) {
    //     this._chosen = value;
    //     this._optionChange(value);
    // }
    public chosen: any;
    @Output() public change: EventEmitter<any> = new EventEmitter<any>();
    /**
     * cells's ngModel bind defaultly for index of options
     * or you can set a value to those options for binding
     */
    @HostBinding('class.weui-cells') public cellsC: boolean = true;
    @HostBinding('class.weui-cells_radio') public radioC: boolean = true;
    // tslint:disable-next-line:no-forward-ref
    @ContentChildren(forwardRef(() => RadioOptionComponent), { descendants: true })
    private options: QueryList<RadioOptionComponent>;
    private currentId: string;
    // private _name: string;
    private _chosen: any;
    public _optionChange(optionId: string) {
        if (!this.options) {
            return;
        }
        if (optionId === this.currentId) {
            // no need to emit the same option
            return;
        }
        // if picked option do not has a value, emit index instead
        this.options.forEach((o, i) => {
            if (o.id === optionId) {
                this.chosen = o.value || i;
                this._controlValueAccessorChangeFn(this.chosen);
                this.change.emit(this.chosen);
                this.currentId = optionId;
                o._setOn();
            } else {
                o._setOff();
            }
        });
    }
    public writeValue(value: any) {
        if (!this.options) {
            return;
        }
        this.options.forEach((o, i) => {
            if (value === o.value || (!o.value && value === i)) {
                this.chosen = value;
                this.currentId = o.id;
                o._setOn();
            } else {
                o._setOff();
            }
        });
    }
    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    public registerOnChange(fn: (value: any) => void) {
        this._controlValueAccessorChangeFn = fn;
    }
    private _controlValueAccessorChangeFn: (value: any) => void = () => {/* */};
    private onTouched: () => any = () => {/* */};
    // private _updateRadioOptionNames() {
    //     if (this.options) {
    //         this.options.forEach((o) => {
    //             o.name = this.name;
    //         });
    //     }
    // }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
    selector: 'label[ye-radio-option]',
    template: `
    <div class="weui-cell__bd"><p style="margin: 0;"><ng-content></ng-content></p></div>
    <div class="weui-cell__ft"><input [id]="id" type="radio" [attr.name]="name" (change)="ignoreInputChange($event)"
    (click)="ignoreInputClick($event)" [checked]="checked" class="weui-check" /><i class="weui-icon-checked"></i></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RadioOptionComponent {
    @Input() public name: string;
    @Input() public value: any;
    get checked() {
        return this._checked;
    }
    set checked(checked: boolean) {
        if (checked !== this.checked) {
            this._checked = checked;
            this._changeDetectorRef.markForCheck();
        }
    }
    @HostBinding('attr.for') public id: string = `ye-radio-option-${++nextUniqueId}`;
    @HostBinding('class.weui-cell') public cellC: boolean = true;
    @HostBinding('class.weui-check__label') public labelA: boolean = true;
    private _checked: boolean = false;
    constructor(
        public _changeDetectorRef: ChangeDetectorRef,
        @Optional() private radioD: RadioDirective
    ) {}
    public ignoreInputChange(event: Event) {
        event.stopPropagation();
    }
    public ignoreInputClick(event: Event) {
        event.stopPropagation();
        if (this.radioD) {
            this.radioD._optionChange(this.id);
        }
    }
    public _setOff() {
        this.checked = false;
    }
    public _setOn() {
        this.checked = true;
    }
}
