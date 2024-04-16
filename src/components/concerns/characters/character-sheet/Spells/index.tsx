import * as S from './styled';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { intToOrdinal } from '@/utils/functions.utils';

interface SpellsProps {
    spell_ids:string[],
    [prop:string]: any
}

export default function Spells({
    spell_ids,
    ...props
}: SpellsProps) {

    const dispatch = useDispatch();

    const spells = useAppSelector((state) => state.entities.spells);

    const charSpells = spell_ids.map( (id) => spells[id]);

    const ranks = ['0','1','2','3','4'];

    const spellsByRank = ranks.map( (rank) => charSpells.filter( (spell) => spell.rank === rank));

    const handleClick = (id:string) => {
        dispatch({
            type: openPanel.type,
            payload: {
                id: id,
                panelType: "spells"
            }
        });
    }

    return(
        <S.Root {...props}>
            {spellsByRank.map( (spells,i) => (
                <S.RankGroup key={i}>
                    <S.Rank>{i > 0 ? intToOrdinal(i) : 'Cantrips'}</S.Rank>
                    <S.RankList>
                    {spells.map( (spell) => (
                        <S.Spell 
                            key={spell.id}
                            onClick={()=>handleClick(spell.id)}
                        >
                                {spell.name}
                        </S.Spell>
                    ))}
                    </S.RankList>
                </S.RankGroup>
            ))}
        </S.Root>
    )
}