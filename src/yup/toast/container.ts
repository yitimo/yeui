import {
    ComponentFactoryResolver, Injector, Component, ViewContainerRef, ViewChild,
    EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, ComponentRef, ViewEncapsulation
} from '@angular/core';
import { ComponentType, CONTAINER_DATA } from '../base/common';
import { ContainerHostDirective } from '../base/container-host';
import { RootRef } from '../base/root.ref';
import { ContainerRef } from '../base/container.ref';
import { toast } from '../animations';

@Component({
    template: `
        <div class="body" [@toast]="_state" (@toast.start)="_onAnimationStart($event)" (@toast.done)="_onAnimationDone($event)">
            <ng-template yupHost></ng-template>
        </div>
    `,
    styles: [`
        .body {
            position: fixed;
            max-width: 300px;
            max-height: 500px;z-index: 99;
            overflow: hidden;text-align: center;padding: 0.5em 1.3em;
            font-size: 16px;color: #fff;background: #000;opacity: 0.8;
            bottom: 10%;left: 50%;border-radius: 3px;
        }
    `],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [toast]
})
export class ToastContainerComponent {
    public animationStateChange = new EventEmitter<AnimationEvent>();
    public _state: 'void' | 'enter' | 'exit' = 'enter';
    private isAnimating = false;
    private disposeFn: (() => void) | null;
    @ViewChild(ContainerHostDirective) private host: ContainerHostDirective;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private changeDetectorRef: ChangeDetectorRef
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
}
