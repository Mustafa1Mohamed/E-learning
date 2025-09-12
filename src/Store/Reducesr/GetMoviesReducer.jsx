const INITIAL_VALUE = {
    movies: []
}

export default function moviesReducer(state = INITIAL_VALUE, action) {

    switch (action.type) {
        case 'GET_MOVIES':
            return {
                movies: action.payload
            }
        default:
            return state;
    }
}