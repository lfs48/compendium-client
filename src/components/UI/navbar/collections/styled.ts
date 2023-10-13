import tw from 'tailwind-styled-components';
import Dropdown from '../../dropdown';

export const Root = tw.div`
    relative
    z-50
`

export const Icon = tw.i`
    fas 
    fa-folder
    text-3xl 
    cursor-pointer
`

export const Menu = tw(Dropdown)`
    w-100
    h-100
    bg-beige
    space-y-2
    py-2
    px-4
`