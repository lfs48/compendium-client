import { getLevelProficiency, getSpellSlots } from '@/utils/dndClass.utils';
import { DndClass, RootState } from '@/types';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';
import React from 'react';
import { useSelector } from 'react-redux';
import EntityLink from '@/components/concerns/entities/entity-link';
import Table from '@atoms/table';

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
    .map( ({id}) => features[id]);

    const extraHeaders = Object.keys(dndClass.table_cols).map( (col, i) => {
        return <S.HeaderCell key={col}>{col}</S.HeaderCell>
    });
    let spellHeaders = [<></>];
    if (dndClass.spellcasting !== "none") {
        spellHeaders = getSpellSlots(dndClass.spellcasting)[1].map( (_, i) => {
            return <S.HeaderCell key={i}>{intToOrdinal(i+1)}</S.HeaderCell>
        });
    }

    const trows = [...Array(20).keys()].map( (n) => {
        const levelFeatures = dndClass.features
        .filter( ({level}) => level === n+1)
        .map( ({id}) => {
            const feature = classFeatures.find(feature => feature.id === id);
            return(
                <EntityLink 
                    key={id} 
                    id={id}
                    entityType='features'
                >
                    {feature?.name}
                </EntityLink>
            )
        });
        const extraCols = Object.keys(dndClass.table_cols).map( (col) => {
            return (
                <S.Cell key={col}>
                    {dndClass.table_cols[col][n]}
                </S.Cell>
            )
        });
        let spellCols = [<></>];
        if (dndClass.spellcasting !== "none") {
            const levelSlots = getSpellSlots(dndClass.spellcasting)[n];
            spellCols = levelSlots.map( (slots, i) => {
                return(
                    <S.Cell key={i}>
                        {slots > 0 ? slots : "—"}
                    </S.Cell>
                )
            })
        }
        return(
            <S.Row key={n}>
                <S.Cell>{intToOrdinal(n+1)}</S.Cell>
                <S.Cell>{`+ ${getLevelProficiency(n+1)}`}</S.Cell>
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