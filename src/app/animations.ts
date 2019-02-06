import { trigger, state, style, transition, animate, group, query, stagger, keyframes} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '*', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in <=> out', animate('500ms ease-in-out' )),
    ]),
]