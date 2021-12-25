import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';

export default function Landing() {

    const [count, setCount] = useState(0);
    
    const handleClick = useCallback( () => {
        setCount((count + 1) % 10);
    }, [count]);

    return(
        <S.Root onClick={handleClick}>
            <p>Hello World! {count}</p>
        </S.Root>
    )
}