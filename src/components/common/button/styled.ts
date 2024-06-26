import tw from 'tailwind-styled-components';
import { Oval } from 'svg-loaders-react';

type RootProps = {
    $block?: boolean;
    $color: string;
    $fill: boolean;
    disabled: boolean;
}

export const Root = tw.button<RootProps>`
    focus:outline-none
    transition-colors
    duration-200
    px-4
    py-2
    rounded
    font-bold
    inline-flex
    justify-center
    items-center
    disabled:cursor-default
    relative
    disabled:text-gray-700
    ${p => p.$block ? 'w-full' : ''}
    ${p => p.$fill ? `` :''}
    ${p => colorClasses(p.$color, p.$fill, p.disabled)}
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
    ${p => p.$loading ? 'invisible' : 'visible'}
`

function colorClasses(color, fill, disabled=false) {
    if (disabled) {
        return`
            bg-gray-400
        `
    }
    if (fill) {
        switch(color) {
            default:
                return`
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    dark:bg-gray-200
                    dark:hover:bg-gray-400
                    dark:text-black
                `
            case('red'):
            return`
                    bg-red-600
                    hover:bg-red-700
                    text-white
                `
            case('green'):
                return`
                    bg-green-600
                    hover:bg-green-700
                    text-white
                `
        }
    } else {
        switch(color) {
            default:
                return`
                    border-2
                    border-blue-600
                    text-blue-600
                    hover:border-blue-700
                    hover:text-blue-700
                    bg-transparent
                `
            case('red'):
            return`
                    border-2
                    border-red-600
                    text-red-600
                    hover:border-red-700
                    hover:text-red-700
                    bg-transparent
                `
            case('green'):
                return`
                    border-2
                    border-green-600
                    text-green-600
                    hover:border-green-700
                    hover:text-green-700
                    bg-transparent
                `
        }
    }
}