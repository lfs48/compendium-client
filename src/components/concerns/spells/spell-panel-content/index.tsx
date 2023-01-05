import React, { useState } from 'react';
import { Spell, RootState } from '@/types';
import * as S from './styled';
import Divider from '@atoms/divider';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@molecules/dialog';
import { useDeleteClassMutation } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteSpellMutation } from '@/api/spells.api';
import { intToOrdinal } from '@/utils/functions.utils';

interface SpellPanelContentProps {
    spell: Spell;
    [prop: string]: any;
}

const SpellPanelContent = React.memo(function SpellPanelContent({
    spell,
    ...props
}: SpellPanelContentProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [triggerDelete, {isLoading, isSuccess}] = useDeleteSpellMutation();
    
    const [confirming, setConfirming] = useState(false);

    const dndClasses = useSelector( (state:RootState) => state.entities.dndClasses)
    const sourceClasses = spell.dnd_class_ids.map( (id) => dndClasses[id]);
    const sourceClassNames = sourceClasses.map( (c) => c.name).join(', ');

    const handleConfirm = () => {
        setConfirming(true);
    }

    const handleDelete = () => {
        triggerDelete(spell.id)
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
        navigate(`/spells/edit/${spell.id}`)
    }

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <i>{intToOrdinal(spell.rank)} rank spell</i>
                <span><b>Casting Time: </b>{spell.casting_time}</span>
                <span><b>Range: </b>{spell.range}</span>
                <span><b>Components: </b>{spell.verbal ? 'V ' : ''}{spell.somatic ? 'S ' : ''}{spell.material ? 'M ' : ''}{spell.material_description ? `(${spell.material_description})` : ''}</span>
                <span><b>Duration: </b>{spell.concentration ? `Concentration, up to ${spell.duration}` : spell.duration }</span>
                <span><b>Classes: </b> {sourceClassNames}</span>
                <S.Description>
                    {spell.description}
                </S.Description>
                {spell.higher_level ? <span><b>At Higher Levels: </b> {spell.higher_level} </span>: ''}
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
                title={`Delete the ${spell.name} spell?`}
                body='This cannot be undone.'
                handleCancel={() => setConfirming(false)}
                handleConfirm={handleDelete}
                loading={isLoading}
            />
        }
        </>
    )
})

export default SpellPanelContent;