import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, PlainButtonComponent } from './button';
import { InputDirective } from './input';
import {
    CellsDirective, CellDirective,
    CellBdDirective, CellFtDirective, CellHdDirective
} from './cell';
import { SelectorComponent } from './selector';
import { OptionComponent } from './check_option';
import { RadioDirective } from './radio';
import { CheckBoxDirective } from './checkbox';

@NgModule({
    declarations: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        SelectorComponent, OptionComponent, RadioDirective,
        CheckBoxDirective
    ],
    imports: [ CommonModule, FormsModule ],
    exports: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        SelectorComponent, OptionComponent, RadioDirective,
        CheckBoxDirective
    ],
    providers: []
})
export class YINModule {}
