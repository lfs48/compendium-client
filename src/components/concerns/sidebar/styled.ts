import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
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
    overflow-y-auto
    scrollbar
`

export const Selectors = tw.div`
    h-full
    flex
    flex-col
    items-end
    py-2
    space-y-4
`