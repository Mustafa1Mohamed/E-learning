const INITIAL_STATE = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
}

const FavReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLE_FAV":
            const exists = state.favorites.find((movie) => movie.id === action.payload.id)
            let updatedFavs=[]

            if (exists) {
                updatedFavs = state.favorites.filter((movie) => movie.id !== action.payload.id)
            } else {
                updatedFavs = [...state.favorites, action.payload];
            }
            localStorage.setItem("favorites", JSON.stringify(updatedFavs))
            return {
                favorites: updatedFavs
            };
        default:
            return state;
    }
};

export default FavReducer;
