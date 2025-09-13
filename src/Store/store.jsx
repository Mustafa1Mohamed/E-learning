import {  createStore } from "redux";

import combinedReducers from "./Reducesr/compinedReducers";

const myStore = createStore(
    combinedReducers,
);

export default myStore;




