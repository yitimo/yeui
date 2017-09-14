import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const mask: AnimationEntryMetadata =
trigger('mask', [
    transition(':enter', [
        style({opacity: 0}), animate('0.3s linear')
    ]),
    transition(':leave', [
        animate('0.3s linear',
        style({opacity: 0}))
    ])
]);
export const dialog: AnimationEntryMetadata =
trigger('dialog', [
    state('*', style({
        'opacity': '1',
        '-webkit-transform': 'translate(-50%, -50%) scale(1)',
        '-moz-transform': 'translate(-50%, -50%) scale(1)',
        '-ms-transform': 'translate(-50%, -50%) scale(1)',
        '-o-transform': 'translate(-50%, -50%) scale(1)',
        'transform': 'translate(-50%, -50%) scale(1)'
    })),
    state('void', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, -50%) scale(0.8)',
        '-moz-transform': 'translate(-50%, -50%) scale(0.8)',
        '-ms-transform': 'translate(-50%, -50%) scale(0.8)',
        '-o-transform': 'translate(-50%, -50%) scale(0.8)',
        'transform': 'translate(-50%, -50%) scale(0.8)'
    })),
    transition(':enter', [
        style({
            'opacity': '0',
            '-webkit-transform': 'translate(-50%, -50%) scale(1.2)',
            '-moz-transform': 'translate(-50%, -50%) scale(1.2)',
            '-ms-transform': 'translate(-50%, -50%) scale(1.2)',
            '-o-transform': 'translate(-50%, -50%) scale(1.2)',
            'transform': 'translate(-50%, -50%) scale(1.2)'
        }),
        animate('0.3s linear')
    ]),
    transition(':leave', [
        animate('0.3s linear',
        style({
            'opacity': '0',
            '-webkit-transform': 'translate(-50%, -50%) scale(0.8)',
            '-moz-transform': 'translate(-50%, -50%) scale(0.8)',
            '-ms-transform': 'translate(-50%, -50%) scale(0.8)',
            '-o-transform': 'translate(-50%, -50%) scale(0.8)',
            'transform': 'translate(-50%, -50%) scale(0.8)'
        }))
    ])
]);

export const toast: AnimationEntryMetadata =
trigger('toast', [
    state('*', style({
        'opacity': '1',
        '-webkit-transform': 'translate(-50%, 0)',
        '-moz-transform': 'translate(-50%, 0)',
        '-ms-transform': 'translate(-50%, 0)',
        '-o-transform': 'translate(-50%, 0)',
        'transform': 'translate(-50%, 0)'
    })),
    state('void', style({
        'opacity': '0',
        '-webkit-transform': 'translate(-50%, 50%)',
        '-moz-transform': 'translate(-50%, 50%)',
        '-ms-transform': 'translate(-50%, 50%)',
        '-o-transform': 'translate(-50%, 50%)',
        'transform': 'translate(-50%, 50%)'
    })),
    transition(':enter', [
        style({
            'opacity': '0',
            '-webkit-transform': 'translate(-50%, 50%)',
            '-moz-transform': 'translate(-50%, 50%)',
            '-ms-transform': 'translate(-50%, 50%)',
            '-o-transform': 'translate(-50%, 50%)',
            'transform': 'translate(-50%, 50%)'
        }),
        animate('0.3s ease-in')
    ]),
    transition(':leave', [
        animate('0.3s ease-out',
        style({
            'opacity': '0',
            '-webkit-transform': 'translate(-50%, 50%)',
            '-moz-transform': 'translate(-50%, 50%)',
            '-ms-transform': 'translate(-50%, 50%)',
            '-o-transform': 'translate(-50%, 50%)',
            'transform': 'translate(-50%, 50%)'
        }))
    ])
]);
