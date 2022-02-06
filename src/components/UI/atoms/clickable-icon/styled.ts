import tw from 'tailwind-styled-components';

type RootProps = {
    $disabled?: boolean;
    $icon: 'check' | 'x' | 'plus';
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

function iconClasses(icon) {
    switch(icon) {
        case('check'):
            return 'far fa-check';
        case('x'):
            return 'fas fa-times';
        case('plus'):
            return 'far fa-plus';
    }
}

function colorClasses(icon) {
    switch(icon) {
        case('check'):
        case('plus'):
            return 'text-green-500';
        case('x'):
            return 'text-red-500';
    }
}