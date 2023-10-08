import tw from 'tailwind-styled-components';

export const Root = tw.div`
    fixed
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    bg-beige-light
    dark:bg-gray-darker
    p-6
    rounded
    z-50
    w-80
    flex
    flex-col
    justify-center
    space-y-2
`

export const Buttons = tw.div`
    flex
    justify-between
`