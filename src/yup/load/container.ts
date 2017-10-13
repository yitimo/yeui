import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    Inject,
    Component,
    ViewContainerRef,
    ViewChild,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ComponentType, CONTAINER_DATA } from '../base/common';
import { ContainerHostDirective } from '../base/container-host';
import { RootRef } from '../base/root.ref';
import { ContainerRef } from '../base/container.ref';

@Component({
    templateUrl: './container.html',
    styleUrls: [`./container.css`],
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [
        trigger('load', [
            state('enter', style({
                'opacity': '1',
                '-webkit-transform': 'translateY(0)',
                '-moz-transform': 'translateY(0)',
                '-ms-transform': 'translateY(0)',
                '-o-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            })),
            state('exit', style({
                'opacity': '0',
                '-webkit-transform': 'translateY(50%)',
                '-moz-transform': 'translateY(50%)',
                '-ms-transform': 'translateY(50%)',
                '-o-transform': 'translateY(50%)',
                'transform': 'translateY(50%)'
            })),
            state('void', style({
                'opacity': '0',
                '-webkit-transform': 'translateY(50%)',
                '-moz-transform': 'translateY(50%)',
                '-ms-transform': 'translateY(50%)',
                '-o-transform': 'translateY(50%)',
                'transform': 'translateY(50%)'
            })),
            transition('* => *', animate('0.3s ease-in'))
        ]),
        trigger('mask', [
            state('enter', style({opacity: 0.7})),
            state('void', style({opacity: 0})),
            state('exit', style({opacity: 0})),
            transition('* => *', animate('0.3s linear'))
        ])
    ]
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
        @Inject(CONTAINER_DATA) public background: string
    ) {}
    public attachComponent<T>(component: ComponentType<T>, injector: Injector) {
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
        console.log('执行关闭动画');
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this.changeDetectorRef.markForCheck();
    }
}
