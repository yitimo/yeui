import { animate, AnimationMetadata, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const mask: AnimationMetadata =
trigger('mask', [
    state('enter', style({opacity: 0.7})),
    state('void', style({opacity: 0})),
    state('exit', style({opacity: 0})),
    transition('* => *', animate('0.3s linear'))
]);
export const dialog: AnimationMetadata =
trigger('dialog', [
    state('enter', style({
        'opacity': '1',
        '-webkit-transform': 'translate(-50%, -50%) scale(1)',
        'transform': 'translate(-50%, -50%) scale(1)'
    })),
    state('void', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, -50%) scale(1.2)',
        'transform': 'translate(-50%, -50%) scale(1.2)'
    })),
    state('exit', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, -50%) scale(0.8)',
        'transform': 'translate(-50%, -50%) scale(0.8)'
    })),
    transition('* => *', [
        animate('0.3s linear')
    ])
]);

export const load: AnimationMetadata =
trigger('load', [
    state('enter', style({
        'opacity': '1',
        '-webkit-transform': 'translateY(0)',
        'transform': 'translateY(0)'
    })),
    state('exit', style({
        'opacity': '0',
        '-webkit-transform': 'translateY(20%)',
        'transform': 'translateY(20%)'
    })),
    state('void', style({
        'opacity': '0',
        '-webkit-transform': 'translateY(20%)',
        'transform': 'translateY(20%)'
    })),
    transition('* => *', animate('0.3s ease-in'))
]);

export const toast: AnimationMetadata =
trigger('toast', [
    state('enter', style({
        'opacity': '1',
        '-webkit-transform': 'translate(-50%, 0)',
        'transform': 'translate(-50%, 0)'
    })),
    state('exit', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, 50%)',
        'transform': 'translate(-50%, 50%)'
    })),
    state('void', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, 50%)',
        'transform': 'translate(-50%, 50%)'
    })),
    transition('* => *', animate('0.3s ease-in'))
]);
