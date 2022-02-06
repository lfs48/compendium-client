import React from 'react';
import * as S from './styled';
import Button from '@atoms/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';

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

    const gm = useSelector( (state:RootState) => state.session.gm);

    return(
        <S.Root {...props}>
            {gm &&
                <>
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
                </>
            }
        </S.Root>
    )
}