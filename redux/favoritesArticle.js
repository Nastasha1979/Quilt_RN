import * as ActionTypes from "./ActionTypes";

export const favoritesArticle = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE_ARTICLE: 
            if(state.includes(action.payload)){
                return state;
            }
            return state.concat(action.payload);
        case ActionTypes.DELETE_FAVORITE_ARTICLE:
            return state.filter(favorite => favorite !== action.payload)
        default: 
            return state;
    }
};