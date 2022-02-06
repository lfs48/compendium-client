import tw from 'tailwind-styled-components';

type RootProps = {
    $active: boolean;
    $animating: boolean;
}

export const Root = tw.div<RootProps>`
    py-2
    pr-4
    pl-6
    group
    cursor-pointer
    transition-colors
    duration-200
    flex
    justify-between
    items-center
    space-x-2
    bg-beige-light
    even:bg-opacity-50
    relative
    before:absolute
    before:w-4
    before:h-full
    before:transition-[left,background-color]
    ${p => p.$active
        ?`
            before:left-0
            before:bg-green-500
            before:hover:bg-green-600
        `
        :`
            before:-left-4
            hover:before:-left-0
            before:bg-yellow-500
        `
    }
`

type NameProps = {
    $animating: boolean;
}

export const Name = tw.div<NameProps>`
    text-lg
    truncate
    pr-2
    ${p => p.$animating
        ?`
            animate-wiggle
        `
        :`
        `
    }
`

type FavoriteProps = {
    $isFavorited: boolean;
}

export const Favorite = tw.i<FavoriteProps>`
    fa-star 
    text-lg 
    cursor-pointer 
    transition-colors
    ${p => p.$isFavorited 
        ?`
            text-yellow-500 fas
        ` 
        :`
            far`
    }
`