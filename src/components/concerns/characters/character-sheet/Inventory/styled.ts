import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full 
    h-full 
    flex 
    flex-col 
    space-y-1
`

export const Grid = tw.div`
    w-full 
    h-full 
    flex 
    flex-col 
    space-y-1
`

export const Headers = tw.div`
    flex
`

export const Header = tw.div`
    h-8
    flex 
    justify-center 
    items-center
    w-full
    first:w-12
    last:w-12
    font-semibold
`

export const Bubble = tw.div`
    bg-gray-300 
    h-8 
    flex
    items-center 
    rounded
    w-full
    first:w-12
    first:justify-center
    last:w-12
    last:justify-center
    px-4
    first:w-12
    first:px-0
    last:px-0
`

export const Footers = tw.div`
    w-full 
    flex 
    justify-between 
    px-2
`

export const Footer = tw.div`
    flex 
    flex-col 
    first:items-start
    last:items-end
`

export const FooterLabel = tw.div`
    text-sm
    font-semibold
`

type FooterValueProps = {
    $over?: boolean;
}

export const FooterValue = tw.div<FooterValueProps>`
    text-xl 
    font-semibold
    ${p => p.$over ? 'text-red-500' : ''}
`

export const CurrencyLine = tw.div`
    flex 
    space-x-2 
    items-center
`

export const Coins = tw.i`
    fas 
    fa-coins 
    text-yellow-500
    pt-1
`