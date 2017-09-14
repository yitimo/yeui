import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, AlertComponent, ToastComponent, LoadComponent } from './templates';
import { DialogService } from './service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [DialogComponent, AlertComponent, ToastComponent, LoadComponent],
    imports: [ NoopAnimationsModule, CommonModule ],
    exports: [],
    providers: [DialogService],
    entryComponents: [DialogComponent, AlertComponent, ToastComponent, LoadComponent]
})
export class YupModule {}
