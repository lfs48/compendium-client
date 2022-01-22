import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full
    h-full-minus-nav
`

export const Workspace = tw.div`
    w-full-minus-sidebar
    h-full
    py-6
    pl-6
    pr-40
    overflow-y-scroll 
    scrollbar
    scrollbar-left
    bg-beige-lightest
`