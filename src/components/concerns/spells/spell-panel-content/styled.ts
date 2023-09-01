import tw from 'tailwind-styled-components';
import Markdown from '@molecules/markdown';

export const Root = tw.div`
    flex
    flex-col
`

export const DescriptionBlock = tw.div`
    my-4
    space-y-1
`

export const Description = tw(Markdown)`

`

export const Block = tw.div`
    ml-4
    mb-2
`