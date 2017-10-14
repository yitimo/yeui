import { AnimationEvent } from '@angular/animations';
import { ToastContainerComponent } from './container';
import { RootRef } from '../base/root.ref';
import { ContainerRef } from '../base/container.ref';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

let uniqueId = 0;

export class ToastRef<T> {
    public componentInstance: T;
    private afterClosed = new Subject<any>();
    private result: any;
    constructor(
        private containerRef: ContainerRef,
        private containerComponent: ToastContainerComponent,
        private readonly id: string = `yup-toast-${uniqueId++}`
    ) {
        Observable.from(containerComponent.animationStateChange)
        .filter((event: AnimationEvent) => event.phaseName === 'done' && event.toState === 'exit')
        .subscribe(() => {
            this.containerRef.removeComponent();
            this.afterClosed.next(this.result);
            this.afterClosed.complete();
            this.componentInstance = null!;
        });
    }
    public close(result?: any) {
        // 执行关闭动画
        this.result = result;
        // Transition the backdrop in parallel to the dialog.
        Observable.from(this.containerComponent.animationStateChange)
            .filter((event: AnimationEvent) => event.phaseName === 'start')
            .subscribe();
        this.containerComponent._startExitAnimation();
    }
    public afterClose() {
        // 订阅关闭事件
        return this.afterClosed.asObservable();
    }
}
