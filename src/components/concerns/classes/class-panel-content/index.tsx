import React, { useState } from 'react';
import { DndClass } from '@/types';
import * as S from './styled';
import Divider from '@/components/common/divider';
import StartingEquipment from '@/components/concerns/classes/starting-equipment';
import ClassProficiencies from '@/components/concerns/classes/class-proficiencies';
import ClassTable from '@/components/concerns/classes/class-table';
import PanelFooter from '@/components/common/panel-footer';
import { useDispatch } from 'react-redux';
import Dialog from '@/components/common/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@/components/common/loading';
import { useNavigate } from 'react-router-dom';
import ClassFeatures from '../class-features';

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
                <ClassProficiencies 
                    dndClass={dndClass}
                />
                <StartingEquipment 
                    equipment={dndClass.equipment}
                />
                <ClassFeatures
                    dndClass={dndClass}
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