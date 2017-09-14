import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YUPComponent } from './yup.component';
import { YUPService } from './yup.service';
import { AlertComponent } from './popups/alert';
import { DialogComponent } from './popups/dialog';
import { LoadComponent } from './popups/load';
import { ToastComponent } from './popups/toast';
import { CustomComponent } from './popups/custom';

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
