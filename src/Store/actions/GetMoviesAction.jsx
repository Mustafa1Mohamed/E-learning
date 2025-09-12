import axios from "axios"


export const getMovies = (searchQuery, currentPage, myLang) => async (dispatch) => {
    try {
        const res = await axios.get(
            searchQuery ?
                `https://api.themoviedb.org/3/search/movie?api_key=29cf44b93ca83bf48d9356395476f7ad&query=${searchQuery}&language=${myLang === 'ar' ? 'ar' : 'en_US'}&page=${currentPage}&adult=false` :
                `https://api.themoviedb.org/3/movie/now_playing?api_key=29cf44b93ca83bf48d9356395476f7ad&page=${currentPage}&language=${myLang === 'ar' ? 'ar' : 'en_US'}&adult=false`
        )
        dispatch({
            type: 'GET_MOVIES',
            payload: res.data.results
        })
    } catch (err) {
        return console.log(err)
    }
}