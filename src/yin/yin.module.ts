import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button';
import { ButtonMiniComponent } from './components/button-mini';
import { InputComponent } from './components/input';
import { weuiTheme } from '../themes/weui';

@NgModule({
    declarations: [ ButtonComponent, ButtonMiniComponent, InputComponent ],
    imports: [ CommonModule ],
    exports: [ ButtonComponent, ButtonMiniComponent, InputComponent ],
    providers: [],
})
export class YINModule {
    /**
     * config build-in theme or custom style piece in string
     * @param theme if not match any build-in theme, add as style piece to head tag directly
     * currently only support 'weui' build-in theme :(
     */
    public static config(theme: string): ModuleWithProviders {
        if (theme !== 'weui') {
            console.log('【yeui-theme】', 'only support theme \'weui\' currently');
        } else {
            let style = window.document.createElement('style');
            style.innerHTML = weuiTheme;
            window.document.head.appendChild(style);
        }
        return {
            ngModule: YINModule,
            providers: []
        };
    }
}
