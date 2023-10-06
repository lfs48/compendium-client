import tw from 'tailwind-styled-components';
import SidebarRow from '../sidebar-row';
import SidebarCell from '../sidebar-cell';

export const Root = tw(SidebarRow)`
    border-b
    border-b-black
    sticky
    top-0
`

export const HeaderCell = tw(SidebarCell)`
    font-semibold
`

export const Sort = tw.i`
`