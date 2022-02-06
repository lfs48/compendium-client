import tw from 'tailwind-styled-components';
import Markdown from '@molecules/markdown';

export const Root = tw.div`
    space-y-4
`

export const Description = tw(Markdown)`
`

export const Block = tw.div`
    ml-4
    mb-2
`