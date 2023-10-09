import tw from 'tailwind-styled-components';

export const Root = tw.div`
`

type BodyProps = {
    $collapsed: boolean;
}

export const Body = tw.div<BodyProps>`
    block
    overflow-hidden
    ${p => p.$collapsed ? 'h-0' : ''}
`

export const Header = tw.header`
    border-b
    border-black
    pb-1
    w-full
    cursor-pointer
    flex
    justify-between
    items-end 
    pr-6
    select-none
`

type ArrowProps = {
    $collapsed: boolean;
}

export const Arrow = tw.i<ArrowProps>`
    fas fa-caret-right 
    transform 
    origin-center
    ${p => p.$collapsed 
        ? `
        `
        :`
            rotate-90
        `
    }
`