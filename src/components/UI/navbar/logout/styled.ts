import tw from 'tailwind-styled-components';
import SpeechBubble from '../../../common/speech-bubble';

export const Root = tw.i`
    fas
    fa-dungeon
    cursor-pointer
    has-tooltip
`

export const Tooltip = tw(SpeechBubble)`
    tooltip
    z-50
`