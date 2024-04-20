import tw from 'tailwind-styled-components';

type DirProps = {
    $dir: 'left' | 'right' | 'top' | 'bottom';
}

export const Root = tw.div<DirProps>`
    text-sm
    font-semibold
    bg-gray-200
    dark:bg-gray-300
    dark:text-black
    rounded-sm
    shadow
    ${p => p.$dir === 'left' ? 'transform -translate-x-4' : ''}
    ${p => p.$dir === 'top' ? '-top-12 transform -translate-x-1/2' : ''}
    ${p => p.$dir === 'right' ? 'left-full transform translate-x-2' : ''}
    ${p => p.$dir === 'bottom' ? 'left-1/2 transform -translate-x-1/2 translate-y-1/2' : ''}
`

export const Content = tw.div`
    relative 
    h-full 
    flex
    justify-center
    items-center
    p-2
    whitespace-nowrap
`

export const Arrow = tw.div<DirProps>`
    w-0
    h-0
    absolute
    ${p => (p.$dir === 'left' || p.$dir === 'right')
        ?`
            border-y-8
            border-r-8
            border-l-8
            border-y-transparent
        `:`
            border-x-8
            border-b-8
            border-t-8
            border-x-transparent
        `
    }
    ${p => p.$dir === 'left' ?`
        border-l-gray-200
        dark:border-l-gray-300
        border-r-transparent 
        -right-4
    `:''}
    ${p => p.$dir === 'right' ?`
        border-r-gray-200
        dark:border-r-gray-300
        border-l-transparent
        -left-4
    `:''}
    ${p => p.$dir === 'top' ?`
        border-t-gray-200
        dark:border-t-gray-300
        border-b-transparent 
        -bottom-4`
    :''}
    ${p => p.$dir === 'bottom' ?`
        border-b-gray-200
        dark:border-b-gray-300
        border-t-transparent 
        -top-4`
    :''}

`