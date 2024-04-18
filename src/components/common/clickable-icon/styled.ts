import { Icon } from '@/enums';
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
        case(Icon.X):
            return `fas fa-${icon}`;
        default:
            return `far fa-${icon}`
    }
}

function colorClasses(icon) {
    switch(icon) {
        case(Icon.Check):
        case(Icon.Plus):
            return 'text-green-500';
        case(Icon.X):
            return 'text-red-500';
        default:
            return '';
    }
}