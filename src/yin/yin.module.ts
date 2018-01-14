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
import { RadioDirective, RadioOptionComponent } from './radio';
import { CheckBoxDirective, CheckBoxOptionComponent } from './checkbox';

@NgModule({
    declarations: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        SelectorComponent,
        CheckBoxOptionComponent, RadioOptionComponent, RadioDirective, CheckBoxDirective
    ],
    imports: [ CommonModule, FormsModule ],
    exports: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        SelectorComponent, RadioDirective, CheckBoxDirective,
        CheckBoxOptionComponent, RadioOptionComponent
    ],
    providers: []
})
export class YINModule {}
