import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector
} from '@angular/core';
import { RootRef } from './root.ref';
import { ContainerRef } from './container.ref';

let nextUniqueId = 0;

@Injectable()
export class Container {
    private rootContainerDOM: HTMLElement;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}
    /**
     * 创建弹窗容器
     */
    public createContainer(): ContainerRef {
        // 1. 创建弹窗
        const dom = document.createElement('div');
        dom.id = `yup-root-${nextUniqueId++}`;
        dom.classList.add('yup-root-container');
        this.getRootContainer().appendChild(dom);
        return new ContainerRef(
            new RootRef(
                dom,
                this.componentFactoryResolver,
                this.appRef,
                this.injector
            ),
            dom
        );
    }
    /**
     * 返回根容器
     * 若没有根容器则新建一个并返回
     */
    private getRootContainer(): HTMLElement {
        if (!this.rootContainerDOM) {
            const dom = document.createElement('div');
            dom.classList.add('yup-root');
            document.body.appendChild(dom);
            this.rootContainerDOM = dom;
        }
        return this.rootContainerDOM;
    }
}
