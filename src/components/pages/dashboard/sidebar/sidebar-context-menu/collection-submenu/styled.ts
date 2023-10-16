import Dropdown from '@/components/UI/dropdown';
import tw from 'tailwind-styled-components';

export const Root = tw(Dropdown)`
    top-0
    right-0
    bg-beige
    transform
    translate-x-full
    pb-2
`

export const Line = tw.div`
    px-2
    py-0.5
    bg-black
    bg-opacity-0
    hover:bg-opacity-10
    cursor-pointer
    first:border-b
    first:border-gray
    flex
    space-x-2
`