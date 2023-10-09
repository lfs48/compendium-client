import tw from 'tailwind-styled-components';
import Checkbox from '@/components/UI/checkbox';

export const Root = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    w-full
    p-2
    bg-beige-lightest
`

export const Points = tw.div`
    flex
    w-full
    h-full
    justify-evenly
    items-center
`

type PointProps = {
    $failed: boolean;
}

export const Point = tw.div<PointProps>`
    w-8
    h-8
    rounded
    border-2
    border-black
    cursor-pointer
    flex
    justify-center
    items-center
    ${p => p.$failed
        ?`
            bg-red-700
        `:`
            bg-green-500
    `}
`

export const Skull = tw.i`
    fas fa-skull
    text-gray-200
    text-lg
`