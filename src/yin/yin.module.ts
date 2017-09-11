import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button';
import { ButtonMiniComponent } from './components/button-mini';
import { InputComponent } from './components/input';

@NgModule({
    declarations: [ ButtonComponent, ButtonMiniComponent, InputComponent ],
    imports: [ CommonModule ],
    exports: [ ButtonComponent, ButtonMiniComponent, InputComponent ],
    providers: [],
})
export class YINModule {}
