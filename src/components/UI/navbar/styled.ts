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
    px-16
    w-full
    z-10
    text-xl
`

export const Left = tw.div`
`

export const Right = tw.div`
    space-x-8
    font-bold
    flex
    items-center
`

export const UserInfo = tw.div`
    flex
    items-center
    space-x-2
`