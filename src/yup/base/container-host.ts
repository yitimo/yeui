import { Directive, Injector, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ComponentType } from './common';

@Directive({
    selector: '[yupHost]',
})
export class ContainerHostDirective {
    private disposeFn: (() => void) | null;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}
    public attachComponent<T>(component: ComponentType<T>, injector: Injector): ComponentRef<T> {
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        // 如果入口已经有宿主则使用那个宿主
        // 否则使用 PortalHost 作为宿主
        const viewContainerRef = this.viewContainerRef;
        // 在宿主上动态创建组件的代码
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(component);
        const ref = viewContainerRef.createComponent(
            componentFactory, viewContainerRef.length,
            injector || viewContainerRef.parentInjector);
        this.setDisposeFn(() => ref.destroy());
        return ref;
    }
    private setDisposeFn(fn: () => void) {
        this.disposeFn = fn;
    }
}
