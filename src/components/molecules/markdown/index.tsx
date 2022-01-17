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

    return(
        <ReactMarkdown
            remarkPlugins={[gfm]}
            //@ts-ignore
            components={{...S}}
            className={props.className || 'keep'}
            {...props}
        />
    )
});

export default Markdown;