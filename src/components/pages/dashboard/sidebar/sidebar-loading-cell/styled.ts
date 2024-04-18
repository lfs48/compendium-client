import tw from 'tailwind-styled-components';
import SidebarRow from '../sidebar-row';

export const Root = tw(SidebarRow)`
    h-8
    even:bg-white
    odd:bg-black
    even:bg-opacity-20
    odd:bg-opacity-10
    odd:first:bg-gray-600
    first:border-b
    first:border-b-black
    group
`

export const Rect = tw.div`
    h-5
    first:w-60
    w-20
    rounded-md
    animate-pulse
    group-even:bg-gray-600
    group-odd:bg-gray-700
    group-first:bg-gray-600
`