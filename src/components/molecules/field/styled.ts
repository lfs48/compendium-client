import Label from '@/components/atoms/label';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    space-y-1
`

type InputContainerProps = {
    $hasErrors: boolean;
    $hasIcon: boolean;
    $iconSide?: 'left' | 'right';
}

export const InputContainer = tw.div<InputContainerProps>`
    relative
    bg-beige-lightest
    rounded-sm
    border
    ${p => p.$hasIcon
        ?`
            ${p => p.$iconSide === 'left'
                ?`
                    pl-6
                `
                :`
                    pr-6
                `
            }
        `
    :``}
    ${p => p.$hasErrors
        ?`
            border-red-500
            ring-1
            ring-red-500
        `
        :`
            border-black
            focus:ring-1
            focus:ring-black
        `
    }
`

type IconProps = {
    $icon: string;
    $iconSide: 'left' | 'right';
}

export const Icon = tw.i<IconProps>`
    absolute
    top-1/2
    -translate-y-1/2
    ${p => p.$icon}
    ${p => p.$iconSide === 'left'
        ?`
            left-2
        `
        :`
            right-2
        `
    }
`