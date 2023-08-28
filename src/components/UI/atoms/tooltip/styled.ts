import tw from 'tailwind-styled-components';

type DirProps = {
    $dir: 'left' | 'right' | 'top' | 'bottom';
}

export const Root = tw.div<DirProps>`
    text-sm
    font-bold
    bg-beige-light
    tooltip
    rounded-sm
    z-50
    ${p => p.$dir === 'left' ? 'right-16' : ''}
    ${p => p.$dir === 'top' ? '-top-12 transform -translate-x-1/2' : ''}
    ${p => p.$dir === 'right' ? 'left-14' : ''}
    ${p => p.$dir === 'bottom' ? 'top-14 -translate-x-1/2' : ''}
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
    ${p => p.$dir === 'left' ? 'border-lbeige-light border-r-transparent -right-4' : ''}
    ${p => p.$dir === 'right' ? 'border-r-beige-light border-l-transparent -left-4' : ''}
    ${p => p.$dir === 'top' ? 'border-t-beige-light border-b-transparent -bottom-4' : ''}
    ${p => p.$dir === 'bottom' ? 'border-b-beige-light border-t-transparent -top-4' : ''}

`