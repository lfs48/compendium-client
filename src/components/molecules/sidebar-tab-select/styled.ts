import tw from 'tailwind-styled-components';

type RootProps = {
    $selected?: boolean;
}

export const Root = tw.div<RootProps>`
    w-32
    h-12
    rounded-tl-full
    rounded-bl-full
    cursor-pointer
    bg-beige-dark
    flex
    justify-between
    items-center
    select-none
    transition-[margin-right]
    duration-500
    overflow-x-hidden
    px-2
    space-x-2
    shadow
    ${p => p.$selected
        ?`
            mr-0
        `
        :`
            -mr-20
            hover:mr-0
        `
    }
    z-10
`