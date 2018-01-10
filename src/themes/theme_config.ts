import { weuiTheme } from './weui';

/**
 * config build-in theme or custom style piece in string
 * @param theme if not match any build-in theme, add as style piece to head tag directly
 * currently only support 'weui' build-in theme :(
 */
export const yeuiThemeConfig = (theme: string) => {
    if (theme !== 'weui') {
        console.log('【yeui-theme】', 'only support theme \'weui\' currently');
    } else {
        let style = window.document.createElement('style');
        style.innerHTML = weuiTheme;
        window.document.head.appendChild(style);
    }
};
