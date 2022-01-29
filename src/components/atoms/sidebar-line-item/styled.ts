import tw from 'tailwind-styled-components';

type RootProps = {
    $active: boolean;
    $animating: boolean;
}

export const Root = tw.div<RootProps>`
    py-2
    px-4
    group
    cursor-pointer
    transition-colors
    duration-200
    flex
    justify-between
    items-center
    space-x-2
    ${p => p.$active
        ?`
            bg-green-600
        `
        :`
            bg-beige-light
            even:bg-opacity-50
        `
    }
`

type NameProps = {
    $animating: boolean;
}

export const Name = tw.div<NameProps>`
    transition-[margin-left]
    duration-300
    group-hover:ml-4
    text-lg
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