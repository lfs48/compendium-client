import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    space-x-2
`

type OptionProps = {
    $selected: boolean;
}

export const Option = tw.div<OptionProps>`
    cursor-pointer
    rounded
    flex
    justify-center
    items-center
    w-20
    h-8
    select-none
    ${p => p.$selected 
        ? `
            bg-green-500
        `:`
            bg-gray-400
        `
    }
`