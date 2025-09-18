import { combineReducers } from 'redux';
import FavReducers from './FavReducer'
import WhishlistReducer from './WhishListReducer';
import themeReducer from './ThemeReducer';
export default combineReducers({
    FavReducers: FavReducers,
    WhishlistReducer: WhishlistReducer,
    combineTheme: themeReducer,
})