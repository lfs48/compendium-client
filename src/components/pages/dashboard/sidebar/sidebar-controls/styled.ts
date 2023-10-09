import Button from '@/components/UI/button';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    px-4
    pt-4
    pb-2
    sticky
    top-0
    bg-beige-light
    dark:bg-gray-600
    space-y-2
`

export const Bottom = tw.div`
    flex
    items-center
    space-x-4
`

type FiltersButtonProps = {
    $show?: boolean;
    $open?: boolean;
}

export const FiltersButton = tw.button<FiltersButtonProps>`
    fas 
    fa-filter
    bg-beige-light
    cursor-pointer
    ${p => p.$show? `` : `invisible`}
    ${p => p.$open? `
        bg-beige-dark
        dark:bg-blue-darker
    `:`
        bg-beige-light 
        dark:bg-gray-600
        hover:bg-beige-dark
        dark:hover:bg-blue-darker
    `}
    has-tooltip
    p-2
    rounded
    transition-colors
`