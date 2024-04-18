import React, { useState } from 'react';
import { Spell } from '@/types';
import * as S from './styled';
import PanelFooter from '@/components/common/panel-footer';
import { useDispatch } from 'react-redux';
import Dialog from '@/components/common/dialog';
import Loading from '@/components/common/loading';
import { useNavigate } from 'react-router-dom';
import { useDeleteSpellMutation } from '@/api/spells.api';
import { intToOrdinal } from '@/utils/functions.utils';
import { spellAspectsString, spellRankString } from '@/utils/spells.util';

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
                <i>{spellRankString(spell)} ({spellAspectsString(spell)})</i>
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