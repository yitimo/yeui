import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button';
import { ButtonMiniComponent } from './components/button-mini';

@NgModule({
    declarations: [ ButtonComponent, ButtonMiniComponent ],
    imports: [ CommonModule ],
    exports: [ ButtonComponent, ButtonMiniComponent ],
    providers: [],
})
export class YINModule {}
