import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { classesData } from "./classesData";
import { classInfo } from "./classInfo";
import { articles } from "./articles";
import { carousel } from "./carousel";
import { comments } from "./comments";
import { classList } from "./classList";
import { frequently } from "./frequently";
import { carouselImages } from "./carouselImages";
import { favoritesClass } from "./favoritesClass";
import { favoritesArticle } from "./favoritesArticle";


const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            classesData,
            classInfo,
            articles,
            carousel,
            comments,
            favoritesClass,
            favoritesArticle,
            classList,
            carouselImages,
            frequently,
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
    return { persistor, store };
};