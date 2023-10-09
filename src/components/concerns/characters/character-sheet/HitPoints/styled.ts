import Button from '@/components/UI/button';
import Input from '@/components/UI/input';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    border-2
    border-black
    rounded
    col-span-3
    flex
    py-1
    px-4
    flex
    justify-between
    bg-beige-lightest
`

export const Hitpoints = tw.div`
    text-4xl
    flex
    flex-col
    items-center
`

export const HitpointControls = tw.div`
    flex
    flex-col
    space-y-1
`

export const ControlButton = tw(Button)`
    h-4
    text-[0.5rem]
`

export const HealButton = tw(ControlButton)`
    w-9
    mr-2
`

export const TempButton = tw(ControlButton)`
    w-9
`

export const DamageButton = tw(ControlButton)`
    w-20
`

export const HitpointInput = tw(Input)`
    w-20
    h-6
    text-[0.75rem]
    border
    border-gray-300
    text-center
`

export const HitpointLabel = tw.div`
    text-sm
    font-semibold
    mt-1
`