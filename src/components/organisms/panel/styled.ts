import tw from "tailwind-styled-components";

type RootProps = {
    $stage: number;
    $transitioning: boolean;
    $minimized: boolean;
}

export const Root = tw.div<RootProps>`
    absolute
    border-2
    border-black
    bg-beige-lighter
    shadow-panel
    z-40
    rounded
    ${p => p.$transitioning
        ?`
            transition-all
            ease-in-out
            ${p.$stage >= 2
                ?`
                    duration-200
                `
                :`
                    duration-500
                `
            }
        `
    :``}
    ${p => p.$stage < 1
        ?`
            opacity-0
        `
        :`
            opacity-100
        `
    }
    ${p => p.$minimized
        ?`
            opacity-20
        `
    :``}
`

export const Header = tw.header`
    flex
    justify-between
    sticky
    w-full
    h-12
    top-0
    bg-white
    px-6
    py-2
    border-b-2
    border-black
    cursor-move
    bg-beige
`

export const Footer = tw.footer`
    flex
    justify-between
    absolute
    bottom-0
    bg-white
    px-12
    py-2
    shadow-inner
    border-t
    border-gray-200
    border-black
    w-full
    h-12
`

export const DraggableArea = tw.div`
    absolute
    top-0
    left-0
    h-12
    w-full
`

export const HeaderContent = tw.h1`
    font-bold
    text-2xl
    font-fancy 
    flex 
    items-center
`

export const PanelSectionHeader = tw.h2`
    font-bold
    text-xl
`

export const PanelSubsectionHeader = tw.h3`
    font-bold
    text-lg
`

export const Block = tw.div`
    ml-4
    mb-2
`

export const Close = tw.i`
    fas 
    fa-times 
    text-lg
    cursor-pointer
    transition-colors
    duration-200
    hover:text-red-500
`

export const Content = tw.div`
    px-6
    py-2
    h-[calc(100%-3rem)]
    overflow-y-auto
    overflow-x-hidden
    scroll
    scrollbar
    bg-beige-lighter
`