import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { classesData } from "./classesData";
import { classInfo } from "./classInfo";
import { articles } from "./articles";
import { carousel } from "./carousel";
import { comments } from "./comments";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            classesData,
            classInfo,
            articles,
            carousel,
            comments
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};