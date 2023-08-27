import tw from 'tailwind-styled-components';
import Markdown from '@molecules/markdown';

export const Root = tw.div`
    flex
    flex-col
`

export const Description = tw(Markdown)`
    italic
    my-6
`

export const Block = tw.div`
    ml-4
    mb-2
`

export const Line = tw.div`
    capitalize
`