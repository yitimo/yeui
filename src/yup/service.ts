import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, InjectionToken,
    ComponentRef, EmbeddedViewRef } from '@angular/core';

import { ComponentType, PortalInjector, Config, DialogConfig, ContainerConfig, CustomConfig,
    ToastConfig, DIALOG_DATA, TOAST_DATA, LoadConfig, LOAD_DATA } from './base/common';
import { RootRef } from './base/root.ref';
import { Container } from './base/container';
import { ContainerRef } from './base/container.ref';

import { DialogContainerComponent } from './dialog/container';
import { DialogRef } from './dialog/dialog.ref';
import { DialogComponent } from './dialog/template';

import { ToastComponent } from './toast/template';
import { ToastRef } from './toast/toast.ref';
import { ToastContainerComponent } from './toast/container';

import { LoadComponent } from './load/template';
import { LoadRef } from './load/load.ref';
import { LoadContainerComponent } from './load/container';

@Injectable()
export class YUPService {
    constructor(
        private container: Container,
        private injector: Injector
    ) {}
    /**
     * 弹出WEUI风格的dialog
     */
    public dialog(config?: DialogConfig) {
        config = config || {};
        config = {
            title: config.title || '消息',
            body: config.body || ' ',
            ok: config.ok || '确认',
            no: config.no || '取消',
            background: config.background || 'mask',
            showCancel: true
        };
        return this.openDialog(DialogComponent, config);
    }
    /**
     * 弹出WEUI风格的alert
     */
    public alert(config?: DialogConfig) {
        config = config || {};
        config = {
            title: config.title || '消息',
            body: config.body || ' ',
            ok: config.ok || '确认',
            no: config.no || '取消',
            background: config.background || 'mask',
            showCancel: false
        };
        return this.openDialog(DialogComponent, config);
    }
    public custom<T>(component: ComponentType<T>, config?: CustomConfig): any {
        console.log('自定义弹窗能力开发中..');
        return {};
    }
    /**
     * 加载动画和吐司使用专门的容器 且不需要自定义内容(以后还是考虑加上自定义)
     */
    public load(config?: LoadConfig) {
        config = config || {};
        config = {
            body: config.body || ' ',
            background: config.background || 'mask',
            duration: config.duration || 0,
            delay: config.delay || 0,
            type: config.type || 'success'
        };
        const containerRef: ContainerRef = this.container.createContainer();
        const containerComponent: LoadContainerComponent =
            this.createContainerComponent(containerRef, LoadContainerComponent, config);
        const loadRef = this.attachLoad(LoadComponent, containerComponent, containerRef, config);
        return loadRef;
    }
    public toast(config?: ToastConfig) {
        config = config || {};
        config = {
            body: config.body || ' ',
            delay: config.delay || 0,
            duration: config.duration || 0
        };
        const containerRef: ContainerRef = this.container.createContainer();
        const containerComponent: ToastContainerComponent =
            this.createContainerComponent(containerRef, ToastContainerComponent, config);
        const toastRef = this.attachToast(ToastComponent, containerComponent, containerRef, config);
        return toastRef;
    }
    /**
     * 对话框专用弹窗 会创建一个WEUI风格的弹窗外壳
     * @param component WEUI弹窗外壳下的内容
     * @param config 配置 显示的信息以及是alert还是dialog等
     */
    private openDialog<T>(component: ComponentType<T>, config: DialogConfig): DialogRef<T> {
        const containerRef: ContainerRef = this.container.createContainer();
        const containerComponent: DialogContainerComponent =
            this.createContainerComponent(containerRef, DialogContainerComponent, {background: config.background});
        const dialogRef = this.attachDialog(component, containerComponent, containerRef, config);
        return dialogRef;
    }
    // 附加弹窗
    private attachDialog<T>(
        component: ComponentType<T>, // 弹窗组件
        containerComponent: any, // 容器组件
        containerRef: ContainerRef, // 容器
        data?: DialogConfig
    ) {
        const dialogRef = new DialogRef<T>(containerRef, containerComponent);
        const injector = this.createDialogInjector<T>(data, dialogRef, containerComponent);
        if (containerComponent.attachComponent) {
            const contentRef = containerComponent.attachComponent(component, injector);
            dialogRef.componentInstance = contentRef.instance;
        }
        return dialogRef;
    }
    private attachToast<T>(
        component: ComponentType<T>, // 弹窗组件
        containerComponent: any, // 容器组件
        containerRef: ContainerRef, // 容器
        data?: ToastConfig
    ) {
        const toastRef = new ToastRef<T>(containerRef, containerComponent);
        const injector = this.createToastInjector<T>(data, toastRef, containerComponent);
        if (containerComponent.attachComponent) {
            const contentRef = containerComponent.attachComponent(component, injector);
            toastRef.componentInstance = contentRef.instance;
        }
        return toastRef;
    }
    private attachLoad<T>(
        component: ComponentType<T>, // 弹窗组件
        containerComponent: any, // 容器组件
        containerRef: ContainerRef, // 容器
        data?: LoadConfig
    ) {
        const loadRef = new LoadRef<T>(containerRef, containerComponent);
        const injector = this.createLoadInjector<T>(data, loadRef, containerComponent);
        if (containerComponent.attachComponent) {
            const contentRef = containerComponent.attachComponent(component, injector);
            loadRef.componentInstance = contentRef.instance;
        }
        return loadRef;
    }
    // 附加容器组件
    private createContainerComponent<T>(
        containerRef: ContainerRef,
        containerComponent: ComponentType<T>,
        containerConfig: ContainerConfig
    ) {
        const container = containerRef.createComponent(containerComponent, containerConfig);
        return container.instance;
    }
    // 装填给弹窗用的服务
    private createDialogInjector<T>(
        config: any = {},
        popupRef: any,
        dialogContainer: DialogContainerComponent
    ): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(DialogRef, popupRef);
        injectionTokens.set(DialogContainerComponent, dialogContainer);
        injectionTokens.set(DIALOG_DATA, config);
        return new PortalInjector(this.injector, injectionTokens);
    }
    private createToastInjector<T>(
        config: any = {},
        popupRef: any,
        toastContainer: ToastContainerComponent
    ): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(ToastRef, popupRef);
        injectionTokens.set(ToastContainerComponent, toastContainer);
        injectionTokens.set(TOAST_DATA, config);
        return new PortalInjector(this.injector, injectionTokens);
    }
    private createLoadInjector<T>(
        config: any = {},
        popupRef: any,
        loadContainer: LoadContainerComponent
    ): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(LoadRef, popupRef);
        injectionTokens.set(LoadContainerComponent, loadContainer);
        injectionTokens.set(LOAD_DATA, config);
        return new PortalInjector(this.injector, injectionTokens);
    }
}
