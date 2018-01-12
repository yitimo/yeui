import {
    Directive, AfterContentInit, HostBinding,
    ContentChildren, QueryList
} from '@angular/core';
import { OptionComponent } from './check_option';

@Directive({
    selector: 'div[ye-checkbox]'
})
export class CheckBoxDirective implements AfterContentInit {
    /**
     * cells's ngModel bind defaultly for index of options
     * or you can set a value to those options for binding
     */
    @HostBinding('class.weui-cells') public cellsC: boolean = true;
    @HostBinding('class.weui-cells_checkbox') public checkboxC: boolean = true;
    @ContentChildren(OptionComponent) public options: QueryList<OptionComponent>;
    public ngAfterContentInit() {
        // only when sub directives in ye-cells can the right class be setted
        this.options.forEach((c) => {
            c.type = 'checkbox';
        });
    }
}