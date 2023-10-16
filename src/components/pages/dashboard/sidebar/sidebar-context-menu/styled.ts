import Dropdown from '@/components/UI/dropdown';
import tw from 'tailwind-styled-components';

export const Root = tw(Dropdown)`
    bg-beige
    dark:bg-gray-dark
    w-60
`

export const Content = tw.div`
    relative
    w-full
    h-full
`

export const Line = tw.div`
    flex
    justify-between
    bg-black
    bg-opacity-0
    hover:bg-opacity-10
    transition-[background]
    px-2
    py-0.5
    cursor-pointer
`

export const Caret = tw.i`
    fas
    fa-caret-right
    leading-none
    flex
    items-center
    text-xl
`