import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Injector, InjectionToken } from '@angular/core';

export interface ComponentType<T> {
    new (...args: any[]): T;
}

export class PortalInjector implements Injector {
    constructor(
        private _parentInjector: Injector,
        private _customTokens: WeakMap<any, any>
    ) {}

    public get(token: any, notFoundValue?: any): any {
        const value = this._customTokens.get(token);

        if (typeof value !== 'undefined') {
            return value;
        }

        return this._parentInjector.get<any>(token, notFoundValue);
    }
}
export interface ContainerConfig {
    background?: 'transition' | 'mask' | 'strict' | 'none' | 'loose'; // 透明点击无效 点击后关闭 点击无效 无遮罩 透明点击后关闭
}
export interface Config extends ContainerConfig {
    data?: any;
}
export interface CustomConfig extends Config {
    radius?: string;
    size?: string[2];
    scroll?: string[2];
}
export interface DialogConfig extends ContainerConfig {
    showCancel?: boolean;
    title?: string;
    body?: string;
    ok?: string;
    no?: string;
}
export interface ToastConfig extends Config {
    body?: string;
    delay?: number;
    duration?: number;
}
export interface LoadConfig extends Config {
    body?: string;
    delay?: number;
    duration?: number;
    type?: 'load' | 'success';
}
export const CONTAINER_DATA = new InjectionToken<any>('CONTAINER_DATA');
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const TOAST_DATA = new InjectionToken<any>('TOAST_DATA');
export const LOAD_DATA = new InjectionToken<any>('LOAD_DATA');
