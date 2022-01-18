import tw from 'tailwind-styled-components';

export const Root = tw.div`
    fixed
    right-0
    top-16
    left
    h-full-minus-nav
    flex
`
export const Content = tw.div`
    w-100
    bg-gray-200
    flex
    flex-col
    divide-y
    divide-black
    border-l
    border-black
    z-20
`

export const Selectors = tw.div`
    h-full
    flex
    flex-col
    items-end
    py-2
    space-y-4
`