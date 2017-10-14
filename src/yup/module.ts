import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YUPService } from './service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Container } from './base/container';
import { ContainerHostDirective } from './base/container-host';
import { DialogContainerComponent } from './dialog/container';
import { DialogComponent } from './dialog/template';
import { ToastContainerComponent } from './toast/container';
import { ToastComponent } from './toast/template';
import { LoadContainerComponent } from './load/container';
import { LoadComponent } from './load/template';

@NgModule({
    declarations: [
        ContainerHostDirective,
        DialogComponent, DialogContainerComponent,
        ToastContainerComponent, ToastComponent,
        LoadContainerComponent, LoadComponent
    ],
    imports: [ BrowserAnimationsModule, CommonModule ],
    exports: [],
    providers: [YUPService, Container],
    entryComponents: [
        DialogComponent, DialogContainerComponent,
        ToastContainerComponent, ToastComponent,
        LoadContainerComponent, LoadComponent
    ]
})
export class YupModule {}
