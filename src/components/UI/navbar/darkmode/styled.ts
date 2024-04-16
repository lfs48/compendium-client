import Toggle from '@/components/UI/toggle';
import tw from 'tailwind-styled-components';
import SpeechBubble from '../../speech-bubble';

type RootProps = {
    $dark: boolean;
}

export const Root = tw.div<RootProps>`
    cursor-pointer
    fas
    ${p => p.$dark ?
    `
        fa-sun
    `:`
        fa-moon
    `
    }
    has-tooltip
`

export const Tooltip = tw(SpeechBubble)`
    tooltip
    z-50
`