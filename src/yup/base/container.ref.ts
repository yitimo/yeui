import { RootRef } from './root.ref';
import { ComponentType, ContainerConfig } from './common';
import { ComponentRef } from '@angular/core';

export class ContainerRef {
    constructor(
        private rootRef: RootRef,
        private rootDOM: HTMLElement
    ) {}
    /**
     * 把弹窗容器添加到弹出层
     * @param containerComponent 弹窗容器组件
     */
    public createComponent<T>(
        containerComponent: ComponentType<T>,
        containerConfig: ContainerConfig
    ): ComponentRef<T> {
        return this.rootRef.attach(containerComponent, containerConfig);
    }
    /**
     * 从弹出层移除弹窗容器
     */
    public removeComponent(): void {
        this.rootRef.dispose();
        if (this.rootDOM.parentNode != null) {
            this.rootDOM.parentNode.removeChild(this.rootDOM);
        }
    }
}
