import React, { useState } from 'react';
import { DndClass } from '@/types';
import * as S from './styled';
import Divider from '@atoms/divider';
import StartingEquipment from '@/components/concerns/classes/starting-equipment';
import ClassHitpoints from '@/components/concerns/classes/class-hitpoints';
import ClassProficiencies from '@/components/concerns/classes/class-proficiencies';
import ClassFeatures from '@/components/concerns/features/features-list';
import ClassTable from '@/components/concerns/classes/class-table';
import Button from '@atoms/button';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch } from 'react-redux';
import Dialog from '@molecules/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';

interface ClassPanelContentProps {
    dndClass: DndClass;
    [prop: string]: any;
}

const ClassPanelContent = React.memo(function ClassPanelContent({
    dndClass,
    ...props
}: ClassPanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteClassMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(dndClass.id)
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
        navigate(`/classes/edit/${dndClass.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <ClassTable
                    dndClass={dndClass}
                />
                <S.Description>
                    {dndClass.description}
                </S.Description>
                <Divider />
                <div>
                    <h1>Class Features</h1>
                    <p>{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
                </div>
                <ClassHitpoints
                    dndClass={dndClass}
                />
                <ClassProficiencies 
                    dndClass={dndClass}
                />
                <StartingEquipment 
                    equipmentList={dndClass.equipment}
                />
                <ClassFeatures
                    featureIDs={dndClass.features}
                    kind='core'
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
                title={`Delete the ${dndClass.name} class?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default ClassPanelContent;