import tw from 'tailwind-styled-components';
import SidebarRow from '../sidebar-row';
import SidebarCell from '../sidebar-cell';

export const Root = tw(SidebarRow)`
    sticky
    top-0
    border-b
    border-b-black
    dark:border-b-gray-400
    bg-beige-light
    dark:bg-gray-600
`

export const HeaderCell = tw(SidebarCell)`
    font-semibold
`

export const Sort = tw.i`
`