import React, { useState } from 'react';
import { Boon, RootState } from '@/types';
import * as S from './styled';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@molecules/dialog';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteBoonMutation } from '@/api/boons.api';

interface BoonPanelContentProps {
    boon: Boon;
    [prop: string]: any;
}

const BoonPanelContent = React.memo(function BoonPanelContent({
    boon,
    ...props
}: BoonPanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteBoonMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(boon.id)
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
        navigate(`/boons/edit/${boon.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                {boon.prereq &&
                    <h2>Prerequisite: {boon.prereq}</h2>
                }
                <S.Description>
                    {boon.description}
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
                title={`Delete the ${boon.name} boon?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default BoonPanelContent;