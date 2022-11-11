import React, { useState } from 'react';
import { DndClass, Feature } from '@/types';
import * as S from './styled';
import Divider from '@atoms/divider';
import PanelFooter from '@molecules/panel-footer';
import Dialog from '@molecules/dialog';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteFeatureMutation } from '@/api/features.api';
import FeatureSources from '@/components/concerns/features/feature-sources';

interface FeaturePanelContentProps {
    feature: Feature
    [prop: string]: any;
}

const FeaturePanelContent = React.memo(function({
    feature,
    ...props
}: FeaturePanelContentProps) {
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteFeatureMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(feature.id)
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
        navigate(`/features/edit/${feature.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <S.Description>
                    {feature.description}
                </S.Description>
                <Divider />
                <FeatureSources feature={feature}/>
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
                title={`Delete this feature?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default FeaturePanelContent;