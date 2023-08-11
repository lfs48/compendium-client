import tw from 'tailwind-styled-components';

type ProficientIndicatorProps = {
    $prof: boolean;
}

export const ProficientIndicator = tw.i<ProficientIndicatorProps>`
    text-xs
    ${p => p.$prof 
        ?`
            fas fa-circle
            text-green-600
        `:`
            fal fa-circle
        `
    }
`