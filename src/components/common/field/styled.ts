import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    space-y-1
    w-full
`

type InputContainerProps = {
    $hasErrors: boolean;
    $hasLeftIcon: boolean;
    $hasRightIcon: boolean;
    $isTextarea: boolean;
}

export const InputContainer = tw.div<InputContainerProps>`
    relative
    transition-colors
    duration-200
    bg-beige-lightest
    dark:bg-gray
    rounded-sm
    border
    ${p => p.$hasLeftIcon
        ?`
            pl-6
        `
    :``}
    ${p => p.$hasRightIcon
        ?`
            pr-6
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
            dark:border-gray-700
            focus-within:ring-1
            focus-within:ring-black
            dark:focus-within:ring-white
        `
    }
    ${p => p.$isTextarea
        ?`
            h-full
        `
    :``}
`

type IconProps = {
    $icon: string;
    $iconSide: 'left' | 'right';
    $isClickable: boolean;
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
    ${p => p.$isClickable
        ?`
            cursor-pointer
        `
        :`
            cursor-auto
        `
    }
`