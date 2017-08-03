import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YUPComponent } from './yup.component';
import { YUPService } from './yup.service';
import { DialogComponent, AlertComponent, LoadComponent, ToastComponent, CustomComponent } from './dialog.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        DialogComponent, AlertComponent,
        LoadComponent, CustomComponent,
        YUPComponent, ToastComponent
    ],
    exports: [YUPComponent],
    providers: [YUPService]
})
export class YUPModule {}
