import tw from 'tailwind-styled-components';
import Button from '@/components/UI/atoms/button';

export const Root = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    justify-center
    w-full
    bg-beige-lightest
    p-2
    space-y-1
`

export const Values = tw.div`
    text-2xl
    font-semibold
`

export const Controls = tw.div`
    flex
    space-x-2
`

export const ControlButton = tw(Button)`
text-[0.5rem]
    w-full
    h-6
`