import { applyMiddleware, createStore } from "redux";

import { thunk } from "redux-thunk"; 

import combinedReducers from "./Reducesr/compinedReducers";

const myStore = createStore(
    combinedReducers,
    applyMiddleware(thunk)
);

export default myStore;




