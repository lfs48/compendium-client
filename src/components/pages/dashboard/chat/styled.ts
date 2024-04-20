import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.div<RootProps>`
    fixed
    w-100
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
    ${p => p.$open ? '-right-0' : '-right-80'}
    transition-[right]
    duration-700
`

export const Body = tw.div`
    h-full
    flex
    flex-col
`

export const Content = tw.div`
    h-[calc(100%-12rem)]
    flex
    flex-col
    w-full
    p-2
`