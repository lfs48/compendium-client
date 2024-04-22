import Dropdown from '@/components/common/dropdown';
import { HexColorInput } from 'react-colorful';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    relative
`

export const Icon = tw.div`
    w-5
    h-5
    rounded-full
    cursor-pointer
    border-2
    border-black
    dark:border-white
`

export const Menu = tw(Dropdown)`
    right-0
    bg-beige
    dark:bg-gray-700
    p-4
    flex
    flex-col
    items-center
    space-y-2
`

export const Hex = tw(HexColorInput)`
    w-20
    px-1.5
    rounded-sm
    bg-beige-lightest
    dark:text-black
`

export const Bottom = tw.div`
    w-full
    flex
    justify-between
`