import tw from 'tailwind-styled-components';

export const Root = tw.nav`
    h-12
    sticky
    bg-beige-lighter
    dark:bg-blue-darkest
    border-b
    border-black
    dark:border-gray-400
    flex
    justify-between
    items-center
    px-12
    w-full
    z-10
`

export const Left = tw.div`
`

export const Right = tw.div`
    space-x-8
    text-xl
    font-bold
    flex
    items-center
`