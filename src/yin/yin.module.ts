import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, PlainButtonComponent } from './components/button';
import { InputComponent } from './components/input';

@NgModule({
    declarations: [ ButtonComponent, PlainButtonComponent, InputComponent ],
    imports: [ CommonModule ],
    exports: [ ButtonComponent, PlainButtonComponent, InputComponent ],
    providers: [],
})
export class YINModule {}
