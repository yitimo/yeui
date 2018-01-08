import {
    ComponentFactoryResolver, Injector, Component, ViewContainerRef, ViewChild,
    EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Inject, ComponentRef, ViewEncapsulation
} from '@angular/core';
import { ComponentType, CONTAINER_DATA } from '../base/common';
import { ContainerHostDirective } from '../base/container-host';
import { RootRef } from '../base/root.ref';
import { ContainerRef } from '../base/container.ref';
import { load, mask } from '../animations';

@Component({
    template: `
        <div class="weui-mask" [@mask]="(data.background === 'transition' || data.background === 'loose') ? 'exit' : _state"></div>

        <div class="weui-toast" [@load]="_state" (@load.start)="_onAnimationStart($event)" (@load.done)="_onAnimationDone($event)">
            <ng-template yupHost></ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    animations: [load, mask]
})
export class LoadContainerComponent {
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
}
