import { useState } from 'react';
import * as S from './styled';
import Field from '../field';
import { handleInput } from '@/utils/component.utils';
import Label from '@/components/atoms/label';
import ClickableIcon from '@/components/atoms/clickable-icon';

interface ClassFormEquipmentProps {
    equipment: string[];
    handleAddLine: (line: string) => void;
    handleRemoveLine: (index: number) => void;
    errors?: string[];
    [prop: string]: any;
}

export default function ClassFormEquipment({
    equipment,
    handleAddLine,
    handleRemoveLine,
    errors=[],
    ...props
}: ClassFormEquipmentProps) {

    const [inputs, setInputs] = useState({
        line: ''
    });

    const clearInputs = () => {
        setInputs({
            line: ''
        })
    }

    const cancelLine = () => {
        clearInputs();
    }

    const addEnabled = inputs.line.length >= 1;

    const _handleAddLine = () => {
        if (addEnabled) {
            handleAddLine(inputs.line);
            cancelLine();
        }
    }


    return(
        <S.Root {...props}>
            <Label>Equipment </Label>
            <S.List>
                {equipment.map( (line, i) => {
                    return (
                        <S.Line key={i}>
                            <S.LineContent>
                                <span>{line}</span>
                                <ClickableIcon 
                                    icon='x'
                                    onClick={() => handleRemoveLine(i)} 
                                />
                            </S.LineContent>
                        </S.Line>
                    )
                })}
            </S.List>
            {equipment.length < 6 && 
                <S.AddingContainer>
                    <Field
                        type='textarea'
                        placeholder='(a) Any heavy weapon or (b) any two light weapons'
                        value={inputs.line}
                        onChange={e => handleInput(e, 'line', inputs, setInputs)}
                        errors={errors}
                    />
                    <S.AddingControls>
                        <ClickableIcon
                            icon='check'
                            disabled={!addEnabled}
                            onClick={_handleAddLine} 
                        />
                    </S.AddingControls>
                </S.AddingContainer>
            }
        </S.Root>
    )
}