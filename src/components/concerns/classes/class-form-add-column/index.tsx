import * as S from './styled';
import { useState } from 'react';
import Field from '../../../common/field';
import Button from '@/components/common/button';

interface ClassFormAddColumnProps {
    handleAddColumn: (name:string) => void;
    [prop: string]: any;
}

export default function ClassFormAddColumn({
    handleAddColumn,
    ...props
}: ClassFormAddColumnProps) {

    const [input, setInput] = useState('');

    const _handleAddColumn = () => {
        handleAddColumn(input);
        setInput('');
    }


    return(
        <S.Root {...props}>
            <Field
                label='New Column Name'
                value={input}
                onChange={(e:any) => setInput(e.target.value)}
            />
            <Button
                className='h-[2.125rem]'
                onClick={_handleAddColumn}
            >
                Add
            </Button>
        </S.Root>
    )
}