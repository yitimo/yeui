import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioComponent, AudioCtrlComponent } from './component';
import { TimePipe } from './pipe';

@NgModule({
    declarations: [AudioComponent, AudioCtrlComponent, TimePipe],
    imports: [CommonModule],
    exports: [AudioComponent, AudioCtrlComponent, TimePipe],
    providers: [],
})
export class AudioModule {}
