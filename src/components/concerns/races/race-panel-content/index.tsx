import React, { useState } from 'react';
import { Race } from '@/types';
import * as S from './styled';
import Divider from '@atoms/divider';
import FeatureList from '@/components/concerns/features/features-list';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch } from 'react-redux';
import Dialog from '@molecules/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteRaceMutation } from '@/api/races.api';

interface RacePanelContentProps {
    race: Race;
    [prop: string]: any;
}

const RacePanelContent = React.memo(function RacePanelContent({
    race,
    ...props
}: RacePanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteRaceMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(race.id)
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
        navigate(`/races/edit/${race.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <S.Description>
                    {race.description}
                </S.Description>
                <Divider />
                <h1>Racial Features</h1>
                <p>{`As a ${race.name.toLowerCase()}, you get the following racial features.`}</p>
                <FeatureList
                    featureIDs={race.features}
                />
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
                title={`Delete the ${race.name} race?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default RacePanelContent;