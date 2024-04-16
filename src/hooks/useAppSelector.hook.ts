import { RootState } from '@/types'
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>()