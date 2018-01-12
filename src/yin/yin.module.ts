import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, PlainButtonComponent } from './button';
import { InputDirective } from './input';
import {
    CellsDirective, CellBdDirective, CellDirective,
    CellFtDirective, CellHdDirective
} from './cell';
import { CheckBoxComponent } from './checkbox';
import { RadioComponent } from './radio';
import { SelectorComponent, OptionComponent } from './selector';

@NgModule({
    declarations: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        CheckBoxComponent, SelectorComponent, OptionComponent,
        RadioComponent
    ],
    imports: [ CommonModule, FormsModule ],
    exports: [
        ButtonComponent, PlainButtonComponent, InputDirective,
        CellsDirective, CellsDirective, CellBdDirective,
        CellDirective, CellFtDirective, CellHdDirective,
        CheckBoxComponent, SelectorComponent, OptionComponent,
        RadioComponent
    ],
    providers: []
})
export class YINModule {}
