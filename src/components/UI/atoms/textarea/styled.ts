import tw from 'tailwind-styled-components';

export const Root = tw.textarea`
    bg-transparent
    focus:outline-none
    rounded-sm
    px-2
    py-1
    w-full
    h-full
    resize-none
    scrollbar
    disabled:bg-gray-300
`