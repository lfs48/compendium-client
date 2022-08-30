import * as S from './styled';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DndClass, RootState } from '@/types';
import { intToOrdinal } from '@/utils/functions.utils';
import { getLevelProficiency } from '@/utils/dndClass.utils';
import Dropdown from '@atoms/dropdown';
import Table from '@atoms/table';
import { LEVEL_ARRAY } from '@/utils/constants.utils';

interface ClassFormTableProps {
    dndClass: DndClass;
    handleColInput: (e: SyntheticEvent, key:string, level: number) => void;
    handleRemoveCol: (key: string) => void;
    handleRenameCol: (key: string, newName:string) => void;
    handleMoveColRight: (key: string) => void;
    handleMoveColLeft: (key: string) => void;
    handleRemoveFeature: (id: string, level:number) =>  void;
    [prop: string]: any;
}

export default function ClassFormTable({
    dndClass,
    handleColInput,
    handleRemoveCol,
    handleRenameCol,
    handleMoveColRight,
    handleMoveColLeft,
    handleRemoveFeature,
    ...props
}: ClassFormTableProps) {

    const [colMenu, setColMenu] = useState(-1);

    const {features} = useSelector( (state:RootState) => ({
        features: state.entities.features
    }));

    const classFeatures = dndClass.features
    .map( (id) => features[id]);

    useEffect( () => {
        if (colMenu !== -1) {

            function closeMenu() {
                setColMenu(-1);
            }

            window.addEventListener("click", closeMenu);
    
            return function cleanupMenuListener() {
                window.removeEventListener("click", closeMenu);
            }
        }
    }, [colMenu]);

    const handleColRightClick = (event, index) =>  {
        event.preventDefault();
        setColMenu(index);
    }

    const _handleRenameCol = (e, col) => {
        e.preventDefault();
        if (e.target.value.length >= 1) {
            handleRenameCol(col, e.target.value);
        }
    }

    const extraHeaders = Object.keys(dndClass.table_cols).map( (col, i) => {
        return(
            <S.HeaderCell 
                key={i}
                onContextMenu={e => handleColRightClick(e, i)}
            >
                <div>
                    <S.ColNameInput
                        value={col}
                        onChange={e => _handleRenameCol(e, col)}
                    />
                    <Dropdown
                        open={colMenu === i}
                    >
                        <S.ColControlMenu>
                            <S.ColMenuButton
                                onClick={() => handleMoveColLeft(col)}
                            >
                                Move Left
                            </S.ColMenuButton>
                            <S.ColMenuButton
                                onClick={() => handleMoveColRight(col)}
                            >
                                Move Right
                            </S.ColMenuButton>
                            <S.ColMenuButton
                                $red
                                onClick={() => handleRemoveCol(col)}
                            >
                                Delete
                            </S.ColMenuButton>
                        </S.ColControlMenu>
                    </Dropdown>
                </div>
            </S.HeaderCell>
        )
    });

    const trows = LEVEL_ARRAY.map( (l) => {
        const levelFeatures = classFeatures
        .filter( ({level}) => level === l);
        const featureComponents = levelFeatures
        .map( ({id}, i) => {
            const feature = features[id];
            return (
                <S.FeatureBubble key={id} onClick={() => handleRemoveFeature(id, l)}>
                    {feature.name}{ i < levelFeatures.length - 1 ? ', ' : ''}
                </S.FeatureBubble>
            )
        });    
        const extraCols = Object.keys(dndClass.table_cols).map( (col, i) => {
            return (
                <S.Cell key={col}>
                    <S.ColValInput
                        type='text'
                        value={dndClass.table_cols[col][n]}
                        onChange={(e) => handleColInput(e, col, n)}
                    />
                </S.Cell>
            )
        });
        return(
            <S.Row>
                <S.Cell>{intToOrdinal(l)}</S.Cell>
                <S.Cell>{`+ ${getLevelProficiency(l)}`}</S.Cell>
                <S.Cell $left $full>
                    <S.LevelFeatures>
                        {featureComponents}
                    </S.LevelFeatures>
                </S.Cell>
                {extraCols}
            </S.Row>
        )
    });

    const theaders = (
        <tr>
            <S.HeaderCell>Level</S.HeaderCell>
            <S.HeaderCell>Prof</S.HeaderCell>
            <S.HeaderCell $left $full>Features</S.HeaderCell>
            {extraHeaders}
        </tr>
    )

    return(
        <Table 
            headers={theaders}
            rows={trows}
            {...props}
        />
    )
}