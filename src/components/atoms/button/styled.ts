import tw from 'tailwind-styled-components';
import { Oval } from 'svg-loaders-react';

type RootProps = {
    $block?: boolean;
    $color: string;
}

export const Root = tw.button<RootProps>`
    focus:outline-none
    transition-colors
    duration-200
    bg-blue-400
    hover:bg-blue-500
    px-4
    py-2
    rounded
    relative
    font-bold
    inline-flex
    justify-center
    items-center
    disabled:bg-gray-400
    disabled:text-gray-700
    disabled:cursor-default
    ${p => p.$block ? 'w-full' : ''}
    ${p => colorClasses(p.$color)}
`

export const LoadingContainer = tw.div`
    absolute 
    left-0 
    top-0 
    w-full 
    h-full 
    flex 
    items-center 
    justify-center
`

export const Spinner = tw(Oval)`
    h-1/2 
    text-blue-500 
    stroke-current
`

type ContentProps = {
    $loading?: boolean;
}

export const Content = tw.div<ContentProps>`
    ${p => p.$loading ? 'opacity-0' : 'opacity-100'}
`

function colorClasses(color) {
    switch(color) {
        default:
            return`
                bg-blue-600
                hover:bg-blue-700
                text-white
            `
        case('red'):
        return`
                bg-red-600
                hover:bg-red-700
                text-white
            `
    }
}