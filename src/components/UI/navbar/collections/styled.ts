import tw from 'tailwind-styled-components';
import Dropdown from '../../dropdown';
import SpeechBubble from '../../speech-bubble';

export const Root = tw.div`
    relative
    z-50
    leading-none
`

export const Icon = tw.i`
    fas 
    fa-folder
    cursor-pointer
    has-tooltip
`

export const Menu = tw(Dropdown)`
    w-100
    bg-beige
    dark:bg-gray-dark
    dark:border
    dark:border-gray
    space-y-2
    py-2
    px-4
`

export const Tooltip = tw(SpeechBubble)`
    tooltip
    z-50
`