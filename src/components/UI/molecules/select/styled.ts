import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    space-y-1
`

type SelectProps = {
    $hasErrors?: boolean;
}

export const StyledSelect = tw.select<SelectProps>`
    transition-colors
    duration-200
    bg-beige-lightest
    dark:bg-gray
    rounded-sm
    focus:outline-none
    px-2
    py-1
    disabled:bg-gray
    dark:disabled:bg-gray-darker
    ${p => p.$hasErrors
        ?`
            ring
            ring-red-500
        `
        :`
            border
            border-black
        `
    }
`

export const Option = tw.option`
    px-2
    py-1
`