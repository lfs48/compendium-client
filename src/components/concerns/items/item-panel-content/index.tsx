import React, { useState } from 'react';
import { Item } from '@/types';
import * as S from './styled';
import PanelFooter from '@/components/common/panel-footer';
import { useDispatch } from 'react-redux';
import Dialog from '@/components/common/dialog';
import Loading from '@/components/common/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteItemMutation } from '@/api/items.api';
import { bulkString, valueString } from '@/utils/items.util';

interface ItemPanelContentProps {
    item: Item;
    [prop: string]: any;
}

const ItemPanelContent = React.memo(function ItemPanelContent({
    item,
    ...props
}: ItemPanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteItemMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(item.id)
        .unwrap()
        .then( res => {
            setConfirming(false)
            console.log(res)
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleEdit = () => {
        navigate(`/items/edit/${item.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <S.Line><b>{item.rarity}{item.magic ? ' Magic ':' '}{item.kind}</b></S.Line>
                <S.Line><b>Bulk</b>: {bulkString(item)}</S.Line>
                <S.Line><b>Value:</b> {valueString(item)}</S.Line>
                <S.Description>
                    {item.description}
                </S.Description>
            </S.Root>
            :
            <Loading />
        }
        <PanelFooter
            handleDelete={handleConfirm}
            handleEdit={handleEdit}
        />
        {confirming &&
            <Dialog
                title={`Delete the ${item.name} item?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default ItemPanelContent;