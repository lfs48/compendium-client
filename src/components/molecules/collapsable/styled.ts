import tw from 'tailwind-styled-components';

export const Root = tw.div`
`

type BodyProps = {
    $transitioning: boolean;
}

export const Body = tw.div<BodyProps>`
    block
    overflow-hidden
    ${p => p.$transitioning 
        ? `
            transition-all
            ease-in
            duration-500
        ` 
        :`
        `
    }
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
    mb-1
`

type ArrowProps = {
    $collapsed: boolean;
}

export const Arrow = tw.i<ArrowProps>`
    fas fa-caret-right 
    transform 
    origin-center 
    transition-transform 
    duration-500
    ${p => p.$collapsed 
        ? `
        `
        :`
            rotate-90
        `
    }
`