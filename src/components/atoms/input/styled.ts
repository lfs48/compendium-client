import tw from 'tailwind-styled-components';

type InputProps = {
    $hasErrors?: boolean;
}

export const Input = tw.input<InputProps>`
    bg-beige-lightest
    border
    rounded-sm
    focus:outline-none
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
    px-2
    py-1
    w-full
`