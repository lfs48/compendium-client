import tw from 'tailwind-styled-components';
import SidebarCell from '../sidebar-cell';
import SidebarRow from '../sidebar-row';

type SidebarBodyRowProps = {
    $active: boolean;
}

export const Root = tw(SidebarRow)<SidebarBodyRowProps>`
    overflow-x-hidden
    relative
    cursor-pointer
    before:absolute
    before:w-4
    before:h-full
    before:transition-[left,background-color]
    flex
    w-full
    ${p => p.$active
        ?`
            bg-beige
            before:left-0
            before:bg-green-500
            before:hover:bg-green-600
            odd:bg-opacity-80
            even:bg-opacity-20
        `
        :`
            odd:bg-white
            even:bg-black
            before:-left-4
            hover:before:-left-0
            before:bg-yellow-500
            odd:bg-opacity-50
            even:bg-opacity-10
        `
    }
`

type FavoriteProps = {
    $isFavorited: boolean;
}

export const Favorite = tw(SidebarCell)<FavoriteProps>`
    fa-star 
    text-lg 
    cursor-pointer 
    transition-colors
    absolute
    right-0
    ${p => p.$isFavorited 
        ?`
            text-yellow-500 fas
        ` 
        :`
            far`
    }
    text-right
    w-full
    pr-4
`