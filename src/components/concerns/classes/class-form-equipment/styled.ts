import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex 
    flex-col 
    col-span-2 
    row-span-4
    space-y-1
`

type CheckProps = {
    $disabled?: boolean;
}

export const AddingContainer = tw.div`
    space-y-2
`

export const AddingControls = tw.div`
    flex 
    justify-end 
    items-center
    space-x-4
`

export const List = tw.ul`
    ml-4
    list-disc
`

export const Line = tw.li`
    w-full 
    py-0.5
    border-b
`

export const LineContent = tw.div`
    flex
    justify-between
    items-center
`