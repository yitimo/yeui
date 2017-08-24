import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdButtonModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [ DialogComponent ],
    imports: [ CommonModule, MdDialogModule, MdButtonModule ],
    exports: [],
    providers: [],
})
export class MaterialplusModule {}
