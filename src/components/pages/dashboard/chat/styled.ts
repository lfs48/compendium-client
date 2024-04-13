import tw from 'tailwind-styled-components';

export const Root = tw.div`
    fixed
    right-0
    w-80
    h-full-minus-nav
    bg-beige-lighter
    dark:bg-gray-600
    text-black
    border-l-2
    border-black
    dark:border-gray-400
    flex
    flex-col
    justify-between
`

export const Body = tw.div`
    h-full
    flex
    flex-col
`