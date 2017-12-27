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
    /**
     * [transition]透明点击无效
     * [mask]点击后关闭
     * [strict]点击无效
     * [none]无遮罩
     * [loose]透明点击后关闭
     */
    background?: 'transition' | 'mask' | 'strict' | 'none' | 'loose';
}
export interface Config extends ContainerConfig {
    /**
     * 包含的数据 object
     */
    data?: any;
}
export interface CustomConfig extends Config {
    /**
     * 圆角
     */
    radius?: string;
    /**
     * 尺寸 [宽, 高]
     */
    size?: string[2];
    /**
     * 是否可滚动
     */
    scroll?: string[2];
}
export interface DialogConfig extends ContainerConfig {
    /**
     * 是否显示取消按钮，用于区分alert和dialog
     */
    showCancel?: boolean;
    /**
     * 弹窗标题
     */
    title?: string;
    /**
     * 内容
     */
    body?: string;
    /**
     * 确认文字
     */
    ok?: string;
    /**
     * 取消文字
     */
    no?: string;
}
export interface ToastConfig extends Config {
    /**
     * 内容
     */
    body?: string;
    /**
     * 延迟弹出时间
     */
    delay?: number;
    /**
     * 弹出持续时间
     */
    duration?: number;
}
export interface LoadConfig extends Config {
    /**
     * 内容
     */
    body?: string;
    /**
     * 延迟出现时间
     */
    delay?: number;
    /**
     * 持续时间
     */
    duration?: number;
    /**
     * [load]加载图标 [success] 成功图标
     */
    type?: 'load' | 'success';
}
export const CONTAINER_DATA = new InjectionToken<any>('CONTAINER_DATA');
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const TOAST_DATA = new InjectionToken<any>('TOAST_DATA');
export const LOAD_DATA = new InjectionToken<any>('LOAD_DATA');
