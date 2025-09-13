const INITIAL_STATE = {
    whishlist: JSON.parse(localStorage.getItem("whishlist")) || []
}

const WhishlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLE_WHISHLIST":
            const exists = state.whishlist.find((course) => course.id === action.payload.id)
            let updatedWhishlist = []

            if (exists) {
                updatedWhishlist = state.whishlist.filter((movie) => movie.id !== action.payload.id)
            } else {
                updatedWhishlist = [...state.whishlist, action.payload];
            }
            localStorage.setItem("whishlist", JSON.stringify(updatedWhishlist))
            return {
                whishlist: updatedWhishlist
            };
        default:
            return state;
    }
};

export default WhishlistReducer;
