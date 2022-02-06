import tw from 'tailwind-styled-components';

export const TableInput = tw.input`
    bg-none
    w-24
    border
    border-black
    rounded
    px-2
    py-0.5
    text-sm
`;

export const FeatureBubble = tw.div`
    flex
    items-center
    mr-2
    space-x-2
    font-bold
    text-sm
    last:mb-0
    hover:text-red-500
    cursor-pointer
`

export const RemoveFeatureButton = tw.button`
    text-sm
    text-red-500
`

type ColMenuButtonProps = {
    $red?: boolean;
}

export const ColMenuButton = tw.button<ColMenuButtonProps>`
    hover:bg-gray-300
    border-b
    border-gray-300
    last:border-none
    ${p => p.$red ? 'text-red-500' : ''}
`

export const Row = tw.tr`
    odd:bg-black 
    odd:bg-opacity-10
    last:border-b
    last:border-black
    last:border-opacity-10
`

type CellProps = {
    $left?: boolean;
    $full?: boolean;
}

export const HeaderCell = tw.th<CellProps>`
    px-2
    relative
    ${p => p.$left
        ?`
            text-left
        `
        :`
            text-center
        `
    }
    ${p => p.$full
        ?`
        `
        :`
            w-20
        `
    }
`

export const Cell = tw.td<CellProps>`
    px-2
    py-1
    align-text-top
    ${p => p.$full
        ?`
        `
        :`
            w-20
        `
    }
    ${p => p.$left
        ?`
            text-left
        `
        :`
            text-center
        `
    }
`

export const AddSubclassFeature = tw.i`
    fas 
    fa-plus
    text-gray-400 
    hover:text-green-500
    cursor-pointer
`

export const RemoveSubclassFeature = tw.i`
    fas 
    fa-check
    text-green-500
    hover:fa-times 
    hover:text-red-500 
    cursor-pointer
`

export const ColNameInput = tw.input`
    w-20 
    text-center
`

export const ColValInput = tw.input`
    text-center 
    w-20 
    ring-1 
    ring-black 
    rounded-sm
`

export const ColControlMenu = tw.div`
    flex 
    flex-col 
    bg-gray-200
`

export const LevelFeatures = tw.div`
    flex 
    flex-wrap 
    items-start
`