import React, { ReactNode } from 'react';
import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm';
import * as S from './styled';

interface MarkdownProps {
    children: string;
    [prop: string]: any;
}

const Markdown = React.memo( function({
    children,
    ...props
}: MarkdownProps) {

    return(
        <ReactMarkdown
            remarkPlugins={[gfm]}
            //@ts-ignore
            components={{...S}}
            children={children}
            {...props}
        />
    )
});

export default Markdown;