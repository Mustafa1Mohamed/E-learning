import { combineReducers } from 'redux';
import FavReducers from './FavReducer'
import moviesReducer from './GetMoviesReducer';

export default combineReducers({
    moviesReducer: moviesReducer,
    FavReducers: FavReducers
})