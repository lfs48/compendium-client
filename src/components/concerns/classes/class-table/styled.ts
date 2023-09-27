import tw from 'tailwind-styled-components';

type CellProps = {
    $left?: boolean;
    $wide?: boolean;
    $full?: boolean;
}

export const HeaderCell = tw.th<CellProps>`
    pb-1
    ${p => p.$left
        ?`
            text-left
            pl-6
            pr-2
        `
        :`
            text-center
            px-2
        `
    }
    ${p => p.$full
        ?`
        `
        :`
            ${p.$wide ? 'w-32' : 'w-12'}
        `
    }
`

export const Row = tw.tr`
    odd:bg-black 
    odd:bg-opacity-10
    last:border-b
    last:border-black
    last:border-opacity-10
`

export const Cell = tw.td<CellProps>`
    py-1
    ${p => p.$full
        ?`
        `
        :`
            ${p.$wide ? 'w-32' : 'w-12'}
        `
    }
    ${p => p.$left
        ?`
            text-left
            pl-6
            pr-2
        `
        :`
            text-center
            px-2
        `
    }
`