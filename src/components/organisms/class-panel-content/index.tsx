import React, { useState } from 'react';
import { DndClass } from '@/types';
import * as S from './styled';
import Divider from '@/components/atoms/divider';
import StartingEquipment from '@/components/molecules/starting-equipment';
import ClassHitpoints from '@/components/molecules/class-hitpoints';
import ClassProficiencies from '@/components/molecules/class-proficiencies';
import ClassFeatures from '@/components/molecules/features-list';
import ClassTable from '@/components/molecules/class-table';
import Button from '@/components/atoms/button';
import PanelFooter from '@/components/molecules/panel-footer';
import { openWorkspace } from '@/reducers/UI/workspace.reducer';
import { useDispatch } from 'react-redux';
import Dialog from '@/components/molecules/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@/components/atoms/loading';

interface ClassPanelContentProps {
    dndClass: DndClass;
    [prop: string]: any;
}

const ClassPanelContent = React.memo(function ClassPanelContent({
    dndClass,
    ...props
}: ClassPanelContentProps) {

    const dispatch = useDispatch();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteClassMutation();
    
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(dndClass.id || '')
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
        dispatch({
            type: openWorkspace .type,
            payload: {
                component: 'classForm',
                data: {
                    id: dndClass.id,
                    dataType: 'dndClasses'
                }
            }
        })
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
                    source={dndClass}
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