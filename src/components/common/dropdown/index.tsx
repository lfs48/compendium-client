import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import * as S from './styled';

interface DropdownProps {
    open: boolean;
    [prop: string]: any;
}

function render({
    open,
    ...props
}: DropdownProps, ref:ForwardedRef<any>) {

    if (open) {
        return(
            <S.Root
                ref={ref}
                {...props}
            />
        )
    } else {
        return <></>
    }
    
}

const Dropdown = forwardRef(render);
export default Dropdown;

