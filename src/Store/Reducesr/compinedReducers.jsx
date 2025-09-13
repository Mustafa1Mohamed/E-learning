import { combineReducers } from 'redux';
import FavReducers from './FavReducer'
import WhishlistReducer from './WhishListReducer';
export default combineReducers({
    FavReducers: FavReducers,
    WhishlistReducer: WhishlistReducer
})