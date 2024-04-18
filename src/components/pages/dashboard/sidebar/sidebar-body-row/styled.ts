import tw from 'tailwind-styled-components';
import SidebarCell from '../sidebar-cell';
import SidebarRow from '../sidebar-row';
import Dropdown from '@/components/common/dropdown';

type RootProps = {
    $active: boolean;
}

export const Root = tw.div<RootProps>`
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
            odd:bg-beige
            even:bg-beige-dark
            dark:odd:bg-purple
            dark:even:bg-purple-dark
            before:left-0
            before:bg-green-500
            before:hover:bg-green-600
        `
        :`
            odd:bg-white
            even:bg-black
            before:-left-4
            hover:before:-left-0
            before:bg-yellow-500
            odd:bg-opacity-20
            even:bg-opacity-10
        `
    }
`

export const ThreeDot = tw.i`
    far
    fa-ellipsis-h
    text-lg 
    cursor-pointer 
    transition-colors
    absolute
    right-0
    top-2
    text-right
    pr-4
    w-8
    leading-none
`

export const ContextMenu = tw(Dropdown)`
    bottom-4
    right-20
    w-60
    bg-beige
    dark:bg-gray
`