import { Injectable, ApplicationRef, ComponentFactoryResolver, ViewContainerRef,
    ComponentRef, EmbeddedViewRef, Injector, InjectionToken, ReflectiveInjector, ComponentFactory } from '@angular/core';
import { DialogComponent } from './templates';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export const YUP_DATA = new InjectionToken<any>('YUPPopupData');

export interface ComponentType<T> {
    new (...args: any[]): T;
}

export class YupRef<T> {
    private afterClose$: Subject<any>;
    private dialogRef: ComponentRef<T>;
    constructor(
        private factory: ComponentFactory<T>,
        private config: any
    ) {
        this.afterClose$ = new Subject<any>();
        this.dialogRef = this.factory.create(
            ReflectiveInjector.resolveAndCreate([
                {provide: YUP_DATA, useValue: config}, {provide: YupRef, useValue: this}
            ])
        );
    }
    public afterClose(): Observable<any> {
        return this.afterClose$.asObservable();
    }
    public close(data?: any) {
        this.afterClose$.next(data);
        this.afterClose$.complete();
        this.dialogRef.destroy();
    }
    public componentRef() {
        return this.dialogRef;
    }
}
