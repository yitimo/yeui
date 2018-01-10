import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, PlainButtonComponent } from './components/button';
import { InputDirective } from './components/input';
import { CellsDirective, CellComponent } from './components/cell';

@NgModule({
    declarations: [ ButtonComponent, PlainButtonComponent, InputDirective, CellsDirective,
        CellComponent ],
    imports: [ CommonModule ],
    exports: [ ButtonComponent, PlainButtonComponent, InputDirective, CellsDirective,
        CellComponent ],
    providers: []
})
export class YINModule {}
