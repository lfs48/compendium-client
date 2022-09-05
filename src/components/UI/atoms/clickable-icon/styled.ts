import { Icon } from '@/types';
import tw from 'tailwind-styled-components';

type RootProps = {
    $disabled?: boolean;
    $icon: Icon;
}

export const Root = tw.i<RootProps>`
    font-bold
    transition-colors
    duration-200
    ${p => iconClasses(p.$icon)}
    ${p => p.$disabled
        ?`
            text-gray-300
        `
        :`
            ${colorClasses(p.$icon)}
            cursor-pointer
        `
    }
`

function iconClasses(icon:Icon) {
    switch(icon) {
        case('x'):
            return `fas fa-${icon}`;
        default:
            return `far fa-${icon}`
    }
}

function colorClasses(icon) {
    switch(icon) {
        case('check'):
        case('plus'):
            return 'text-green-500';
        case('x'):
            return 'text-red-500';
        default:
            return '';
    }
}