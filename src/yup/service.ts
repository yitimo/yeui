import { Injectable, ApplicationRef, ComponentFactoryResolver, ViewContainerRef,
    ComponentRef, EmbeddedViewRef, Injector, InjectionToken, ReflectiveInjector, ComponentFactory } from '@angular/core';
import { YupRef, ComponentType } from './popup.ref';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogComponent, AlertComponent, LoadComponent, ToastComponent } from './templates';

@Injectable()
export class DialogService {
    private _afterClose: Subject<any>;
    private loadRef: YupRef<LoadComponent>;
    constructor(
        private appRef: ApplicationRef,
        private compFactRes: ComponentFactoryResolver
    ) {}
    public dialog(config: {
        title?: string,
        msg?: string,
        ok?: string,
        no?: string,
        mask?: boolean
    }) {
        return this.open(DialogComponent, config);
    }
    public alert(config: {
        title?: string,
        msg?: string,
        ok?: string,
        mask?: boolean
    }) {
        return this.open(AlertComponent, config);
    }
    public load(config: {
        type?: string,
        msg?: string,
        mask?: boolean,
        duration?: number
    }) {
        if (this.loadRef) {
            this.loadRef.close();
            delete this.loadRef;
        }
        this.loadRef = this.open(LoadComponent, config);
        return this.loadRef;
    }
    public loaded() {
        if (this.loadRef) {
            this.loadRef.close();
            delete this.loadRef;
        }
    }
    public toast(config: {
        msg?: string,
        duration?: number
    }) {
        return this.open(ToastComponent, config);
    }
    public open<T>(component: ComponentType<T>, config: any) {
        const factory = this.compFactRes.resolveComponentFactory(component);
        const dialogRef = new YupRef(factory, config);
        window.document.body.appendChild(this.getComponentRootNode(dialogRef.componentRef()));
        this.appRef.attachView(dialogRef.componentRef().hostView);
        return dialogRef;
    }
    private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
