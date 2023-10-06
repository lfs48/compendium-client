import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.div<RootProps>`
    flex
    ${p => p.$open ? '-ml-0' : '-ml-[28rem]'}
    transition-[margin-left]
    duration-700
`

export const Body = tw.div`
    w-100
    bg-gray-100
    flex
    flex-col
    border-r-2
    border-black
    relative
`

export const Content = tw.div`
    h-full
`

export const Selectors = tw.div`
    h-full
    flex
    flex-col
    items-end
    py-2
    space-y-4
`