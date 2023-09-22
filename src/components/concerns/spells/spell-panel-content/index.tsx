import React, { useState } from 'react';
import { Spell, RootState } from '@/types';
import * as S from './styled';
import PanelFooter from '@molecules/panel-footer';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@molecules/dialog';
import Loading from '@atoms/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteSpellMutation } from '@/api/spells.api';
import { intToOrdinal } from '@/utils/functions.utils';
import EntityLink from '../../entities/entity-link';
import { Entity } from '@/enums';
import { merge, capitalize } from 'lodash';

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

    const aspects = merge([],spell.aspects);
    let aspectsString = 'No aspects';
    if (aspects.length >= 1) {
        aspectsString = aspects.sort().map( aspect => capitalize(aspect) ).join(', ');
    }
    

    return(
        <>
        {(!isLoading && !isSuccess) ?
            <S.Root {...props}>
                <i>{intToOrdinal(spell.rank)} rank spell ({aspectsString})</i>
                <span><b>Casting Time: </b>{spell.casting_time}</span>
                <span><b>Range: </b>{spell.range}</span>
                <span><b>Targets: </b>{spell.targets}</span>
                <span><b>Duration: </b>{spell.concentration ? `Concentration, up to ${spell.duration}` : spell.duration }</span>
                {spell.material &&
                    <span><b>Material: </b>{spell.material}</span>
                }
                <S.DescriptionBlock>
                    <S.Description>{spell.description}</S.Description>
                    {spell.upcast && 
                    spell.upcast.map( (desc, i) => {
                        const rank = parseInt(spell.rank) + i + 1;
                        const str = `***At ${intToOrdinal(rank)} rank${rank < 4 ? ' and above' : ''}.*** ${desc}`
                        return (
                            <S.Description key={i}>
                                {str}
                            </S.Description>
                        )
                    })
                }
                </S.DescriptionBlock>
                <div>
                    {sourceClasses.map( (dndClass) => 
                        <EntityLink
                            key={dndClass.id}
                            id={dndClass.id}
                            entityType={Entity.dndClasses}
                        >
                            {dndClass.name}
                        </EntityLink>
                    )}
                </div>
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