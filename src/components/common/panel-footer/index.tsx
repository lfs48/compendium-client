import React from 'react';
import * as S from './styled';
import Button from '@/components/common/button';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
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

    const gm = useAppSelector( (state) => state.session.gm);

    return(
        <S.Root {...props}>
            {gm &&
                <>
                <S.Button
                    color='red'
                    onClick={handleDelete}
                >
                    Delete
                </S.Button>
                <S.Button
                    onClick={handleEdit}
                >
                    Edit
                </S.Button>
                </>
            }
        </S.Root>
    )
}