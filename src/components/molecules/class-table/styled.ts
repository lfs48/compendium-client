import tw from 'tailwind-styled-components';

export const Root = tw.table`
    w-full
`

export const Header = tw.thead`
    border-b-2 
    border-black
`

type CellProps = {
    $left?: boolean;
}

export const HeaderCell = tw.th<CellProps>`
    px-2
    pb-1
    ${p => p.$left
        ?`
            text-left
        `
        :`
            text-center
        `
    }
`

export const Row = tw.tr`
    border-b 
    border-gray-400
`

export const Cell = tw.td<CellProps>`
    px-2
    py-1
    ${p => p.$left
        ?`
            text-left
        `
        :`
            text-center
        `
    }
`