import SpeechBubble from '@/components/common/speech-bubble';
import tw from 'tailwind-styled-components';

type RootProps = {
    $selected?: boolean;
}

export const Root = tw.div<RootProps>`
    w-12
    h-12
    rounded-tr-full
    rounded-br-full
    cursor-pointer
    bg-beige-dark
    dark:bg-gray-400
    flex
    justify-between
    items-center
    select-none
    px-2
    space-x-2
    shadow
    has-tooltip
`

export const Tooltip = tw(SpeechBubble)`
    tooltip
    z-50
`