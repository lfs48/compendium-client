import Button from '@/components/UI/atoms/button';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    p-4
    sticky
    top-0
    bg-beige
    border-b-2
    border-black
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
    ${p => p.$open? `bg-beige-dark` : `bg-beige hover:bg-beige-dark`}
    has-tooltip
    p-2
    rounded
    transition-colors
`