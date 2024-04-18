import tw from 'tailwind-styled-components';

export const Input = tw.input`
    bg-transparent
    focus:outline-none
    rounded-sm
    px-2
    py-1
    disabled:bg-gray-300
    dark:disabled:bg-gray-dark
`