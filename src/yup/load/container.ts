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
        <div class="mask" [@mask]="(data.background === 'transition' || data.background === 'loose') ? 'exit' : _state"></div>

        <div class="body" [@load]="_state" (@load.start)="_onAnimationStart($event)" (@load.done)="_onAnimationDone($event)">
            <ng-template yupHost></ng-template>
        </div>
    `,
    styles: [`
        .body {
            position: fixed;
            z-index: 5000;
            width: 7.6em;
            min-height: 7.6em;
            top: 180px;
            left: 50%;
            margin-left: -3.8em;
            background: rgba(17, 17, 17, 0.7);
            text-align: center;
            border-radius: 5px;
            color: #FFFFFF;
        }
        .mask {
            position: fixed;z-index: 90;
            top: 0;left: 0;right: 0;bottom: 0;
            background: #000;
        }
    `],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
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
