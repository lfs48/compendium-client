import { InventorySlot } from '@/types/Character';
import * as S from './styled';

interface InventoryProps {
    slots: InventorySlot[];
    capacity: number;
    currency: number;
    [prop: string]: any;
}

export default function Inventory({
    slots,
    capacity,
    currency,
    ...props
}: InventoryProps) {

    const lines = slots.map( (slot) => 
        <div className='flex space-x-2 w-full'>
            <S.Bubble>{slot.quantity}</S.Bubble>
            <S.Bubble>{slot.label}</S.Bubble>
            <S.Bubble>{slot.bulk}</S.Bubble>
        </div>
    );

    let bulk = 0;
    slots.forEach( (slot) => bulk += slot.bulk);

    return(
        <S.Root {...props}>
            <S.Grid>
                <S.Headers>
                    <S.Header>#</S.Header>
                    <S.Header>Item</S.Header>
                    <S.Header>Bulk</S.Header>
                </S.Headers>
                {lines}
            </S.Grid>
            <S.Footers>
                <S.Footer>
                    <S.FooterLabel>CURRENCY</S.FooterLabel>
                    <S.CurrencyLine>
                        <S.Coins/>
                        <S.FooterValue>{currency}</S.FooterValue>
                    </S.CurrencyLine>
                </S.Footer>
                <S.Footer>
                    <S.FooterLabel>TOTAL BULK</S.FooterLabel>
                    <S.FooterValue $over={bulk>capacity}>{bulk}/{capacity}</S.FooterValue>
                </S.Footer>
            </S.Footers>
        </S.Root>
    )
}