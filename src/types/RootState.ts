import EntitiesReducer from '@/reducers/entities/entities.reducer';
import SessionReducer from '@/reducers/session.reducer';
import UIReducer from '@/reducers/UI/UI.reducer';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  session: ReturnType<typeof SessionReducer>,
  entities: ReturnType<typeof EntitiesReducer>,
  UI: ReturnType<typeof UIReducer>,
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
