import { ForwardedRef, forwardRef } from 'react';
import * as S from './styled';

interface DropdownProps {
    open: boolean;
    [prop: string]: any;
}

function render({
    open,
    ...props
}: DropdownProps, ref:ForwardedRef<any>) {
    return(
        <S.Root
            $open={open}
            ref={ref}
            {...props}
        />
    )
}

const Dropdown = forwardRef(render);
export default Dropdown;

