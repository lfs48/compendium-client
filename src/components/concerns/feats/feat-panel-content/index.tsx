import React, { useState } from 'react';
import { Feat, RootState } from '@/types';
import * as S from './styled';
import Divider from '@atoms/divider';
import FeatureList from '@/components/concerns/features/features-list';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@molecules/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteFeatMutation } from '@/api/feats.api';

interface FeatPanelContentProps {
    feat: Feat;
    [prop: string]: any;
}

const FeatPanelContent = React.memo(function FeatPanelContent({
    feat,
    ...props
}: FeatPanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteFeatMutation();
    
    const [confirming, setConfirming] = useState(false);

    const sourceClass = useSelector( (state:RootState) => state.entities.dndClasses[feat.dnd_class_id])

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(feat.id)
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
        navigate(`/feats/edit/${feat.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <h2>{sourceClass.name} Feat</h2>
                <S.Description>
                    {feat.description}
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
                title={`Delete the ${feat.name} feat?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default FeatPanelContent;