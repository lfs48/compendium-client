import React from 'react';
import * as S from './styled';
import Button from '@atoms/button';

interface PanelFooterProps {
    handleDelete: () => void;
    handleEdit: () => void;
    [prop: string]: any;
}

export default function PanelFooter({
    handleDelete,
    handleEdit,
    ...props
}: PanelFooterProps) {

    return(
        <S.Root {...props}>
            <Button
                color='red'
                onClick={handleDelete}
                className={S.Button}
            >
                Delete
            </Button>
            <Button
                onClick={handleEdit}
                className={S.Button}
            >
                Edit
            </Button>
        </S.Root>
    )
}