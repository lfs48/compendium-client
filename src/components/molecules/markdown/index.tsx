import EntityLink from '@/components/atoms/entity-link';
import React, { ReactNode } from 'react';
import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm';
import * as S from './styled';

interface MarkdownProps {
    [prop: string]: any;
}

const Markdown = React.memo( function({
    ...props
}: MarkdownProps) {

    const components = {
        a: ({href, ...rest}) => <EntityLink inline entityType={href.split('/')[0]} id={href.split('/')[1]} {...rest} />
    }

    return(
        <ReactMarkdown
            remarkPlugins={[gfm]}
            //@ts-ignore
            components={{
                ...components,
                ...S
            }}
            className={props.className || 'keep'}
            {...props}
        />
    )
});

export default Markdown;