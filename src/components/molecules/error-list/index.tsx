import Error from '@/components/atoms/error';
import * as S from './styled';

interface ErrorProps {
    errors: string[];
    [prop: string]: any;
}

export default function ErrorList({
    errors,
    ...props
}: ErrorProps) {

    const errorList = errors.map( (error, i) => (
        <Error 
            key={i} 
            error={error}
        />
    ));

    return(
        <S.Root {...props}>
            {errorList}
        </S.Root>
    )
}