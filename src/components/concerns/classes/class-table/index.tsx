import { getLevelHP, getLevelProficiency, getSpellSlots, isSpellcaster } from '@/utils/dndClass.utils';
import { DndClass, RootState } from '@/types';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EntityLink from '@/components/concerns/entities/entity-link';
import Table from '@atoms/table';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import { Entity } from '@/enums';

interface ClassTableProps {
    dndClass: DndClass;
    [prop: string]: any;
}

export default React.memo( function ClassTable({
    dndClass, 
    ...props
} :ClassTableProps) {

    const {features} = useSelector( (state:RootState) => ({
        features: state.entities.features
    }));

    const classFeatures = dndClass.features
    .map( (id) => features[id]);

    const extraHeaders = Object.keys(dndClass.table_cols).map( (col) => {
        return <S.HeaderCell key={col}>{col}</S.HeaderCell>
    });
    let spellHeaders = [] as ReactNode[];
    if ( isSpellcaster(dndClass) ) {
        spellHeaders = getSpellSlots(dndClass.spellcasting)[1].map( (_, i) => {
            return <S.HeaderCell key={i}>{intToOrdinal(i+1)}</S.HeaderCell>
        });
    }

    const trows = LEVEL_ARRAY.map( (n, i) => {
        const levelFeatures = classFeatures
        .filter( ({level}) => level === n)
        .map( ({id}) => {
            const feature = classFeatures.find(feature => feature.id === id);
            return(
                <EntityLink 
                    key={id} 
                    id={id}
                    entityType={Entity.features}
                >
                    {feature?.name}
                </EntityLink>
            )
        });
        const extraCols = Object.keys(dndClass.table_cols).map( (col) => {
            return (
                <S.Cell key={col}>
                    {dndClass.table_cols[col][i]}
                </S.Cell>
            )
        });
        let spellCols = [] as ReactNode[];
        if ( isSpellcaster(dndClass) ) {
            const levelSlots = getSpellSlots(dndClass.spellcasting)[i];
            spellCols = levelSlots.map( (slots, j) => {
                return(
                    <S.Cell key={j}>
                        {slots > 0 ? slots : "—"}
                    </S.Cell>
                )
            })
        }
        return(
            <S.Row key={n}>
                <S.Cell>{intToOrdinal(n)}</S.Cell>
                <S.Cell>{`+ ${getLevelProficiency(n)}`}</S.Cell>
                <S.Cell $left>{getLevelHP( parseInt(dndClass.hp), n)}</S.Cell>
                <S.Cell $left $full>
                    {levelFeatures}
                </S.Cell>
                {extraCols}
                {spellCols}
            </S.Row>
        )
    });

    const theaders = (
        <tr>
            <S.HeaderCell>Level</S.HeaderCell>
            <S.HeaderCell>Prof</S.HeaderCell>
            <S.HeaderCell $left>HP</S.HeaderCell>
            <S.HeaderCell $left $full>Features</S.HeaderCell>
            {extraHeaders}
            {spellHeaders}
        </tr>
    )

    return(
        <Table 
            headers={theaders}
            rows={trows}
            {...props}
        />
    )
})