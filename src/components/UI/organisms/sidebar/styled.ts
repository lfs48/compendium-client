import tw from 'tailwind-styled-components';

export const Root = tw.div`
    fixed
    right-0
    top-12
    left
    h-full-minus-nav
    flex
`
export const Body = tw.div`
    w-100
    bg-gray-100
    flex
    flex-col
    border-l
    border-black
    z-20
    relative
`

export const Content = tw.div`
    divide-y
    divide-black
    overflow-y-auto 
    scrollbar
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