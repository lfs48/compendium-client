import tw from 'tailwind-styled-components';
import Markdown from '@molecules/markdown';
import FeatureTagline from '../feature-tagline';

export const Root = tw.div`
    space-y-4
`

export const Heading = tw.div`
    w-full
    flex
    justify-center
`

export const Description = tw(Markdown)`
`

export const Block = tw.div`
    ml-4
    mb-2
`