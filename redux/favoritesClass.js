import * as ActionTypes from "./ActionTypes";

export const favoritesClass = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE_CLASS: 
            if(state.includes(action.payload)){
                return state;
            }
            return state.concat(action.payload);
        case ActionTypes.DELETE_FAVORITE_CLASS:
            return state.filter(favorite => favorite !== action.payload)
        default: 
            return state;
    }
};