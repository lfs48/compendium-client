import * as S from './styled';

export default function ChatLoading({...props}) {

    const els = [...Array(11).keys()].map( (i) => 
        <S.Line key={i}>
            <S.Rect className='w-12' />
            <S.Rect className='w-24' />
            <S.Rect className='w-8' />
            <S.Rect className='w-16' />
            <S.Rect className='w-24' />
            <S.Rect className='w-6' />
            <S.Rect className='w-24' />
        </S.Line>
    )
    return(
        <S.Root>
            {els}
        </S.Root>
    )
}