import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, PlainButtonComponent } from './button';
import { InputDirective } from './input';
import {
    CellsDirective, CellBdDirective, CellDirective,
    CellFtDirective, CellHdDirective
} from './cell';

@NgModule({
    declarations: [
        ButtonComponent, PlainButtonComponent, InputDirective, CellsDirective,
        CellsDirective, CellBdDirective, CellDirective,
        CellFtDirective, CellHdDirective
    ],
    imports: [ CommonModule ],
    exports: [
        ButtonComponent, PlainButtonComponent, InputDirective, CellsDirective,
        CellsDirective, CellBdDirective, CellDirective,
        CellFtDirective, CellHdDirective
    ],
    providers: []
})
export class YINModule {}
