import {
    ComponentFactoryResolver, Injector, Component, ViewContainerRef, ViewChild,
    EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Inject, ComponentRef,
    ViewEncapsulation
} from '@angular/core';
import { ComponentType, CONTAINER_DATA } from '../base/common';
import { ContainerHostDirective } from '../base/container-host';
import { RootRef } from '../base/root.ref';
import { ContainerRef } from '../base/container.ref';
import { dialog, mask } from '../animations';

@Component({
    selector: 'yup-container',
    template: `
        <div class="mask" [@mask]="(data.background === 'transition' || data.background === 'loose') ? 'exit' : _state" (click)="close()"></div>
        <div class="body" [@dialog]="_state" (@dialog.start)="_onAnimationStart($event)" (@dialog.done)="_onAnimationDone($event)">
            <ng-template yupHost></ng-template>
        </div>
    `,
    styles: [`
        .body {
            z-index: 91;
            width: 80%;max-width: 300px;
            position: fixed;top: 50%;left: 50%;
            background-color: #ffffff;
            text-align: center;border-radius: 3px;
            overflow: hidden;
        }
        .mask {
            position: fixed;z-index: 90;
            top: 0;left: 0;right: 0;bottom: 0;
            background: #000;
        }
    `],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [dialog, mask]
})
export class DialogContainerComponent {
    public animationStateChange = new EventEmitter<AnimationEvent>();
    public _state: 'void' | 'enter' | 'exit' = 'enter';
    private isAnimating = false;
    private disposeFn: (() => void) | null;
    @ViewChild(ContainerHostDirective) private host: ContainerHostDirective;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(CONTAINER_DATA) public data: any
    ) {}
    public attachComponent<T>(component: ComponentType<T>, injector: Injector): ComponentRef<T> {
        return this.host.attachComponent(component, injector);
    }
    public _onAnimationDone(event: AnimationEvent) {
        this.animationStateChange.emit(event);
        this.isAnimating = false;
    }
        /** Callback, invoked when an animation on the host starts. */
    public _onAnimationStart(event: AnimationEvent) {
        this.isAnimating = true;
        this.animationStateChange.emit(event);
    }
        /** Starts the dialog exit animation. */
    public _startExitAnimation(): void {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this.changeDetectorRef.markForCheck();
    }
    // 从遮罩关闭
    public close() {
        if (this.data.background === 'mask' || this.data.background === 'loose') {
            this._startExitAnimation();
        }
    }
}
