import {
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    ComponentRef,
    EmbeddedViewRef,
    InjectionToken
} from '@angular/core';
import { ComponentType, ContainerConfig, PortalInjector, CONTAINER_DATA } from './common';
import { ContainerRef } from './container.ref';

export class RootRef {
    private disposeFn: (() => void) | null;
    private isDisposed: boolean = false;
    constructor(
        private rootDOM: HTMLElement,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}
    /**
     * 创建出弹窗容器组件并添加到弹出层
     * @param containerComponent 弹窗容器组件
     */
    public attach<T>(
        containerComponent: ComponentType<T>,
        containerConfig: ContainerConfig
    ) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(containerComponent);
        let componentRef: ComponentRef<T>;
        // 这一步要把遮罩的配置作为服务注入容器组件
        const injectionTokens = new WeakMap();
        injectionTokens.set(CONTAINER_DATA, containerConfig.background || {});

        componentRef = componentFactory.create(new PortalInjector(this.injector, injectionTokens));
        this.appRef.attachView(componentRef.hostView);
        this.setDisposeFn(() => {
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        });
        this.rootDOM.appendChild(this.getComponentRootNode(componentRef));
        return componentRef;
    }

    /**
     * 执行提前配置好的移除方法
     * 完成后重置移除方法
     */
    public dispose(): void {
        if (this.disposeFn) {
            this.disposeFn();
            this.disposeFn = null;
            console.log('销毁了容器');
        }
        this.isDisposed = true;
    }
    /**
     * 设置移除弹窗容器时的方法
     */
    private setDisposeFn(fn: () => void) {
        this.disposeFn = fn;
    }
    /**
     * 根据组件拿到DOM中的节点
     */
    private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
