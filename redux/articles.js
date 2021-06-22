import * as ActionTypes from "./ActionTypes";


export const articles = (state = { isLoading: false, errMess: null, articles: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_ARTICLES:
            return {...state, isLoading: false, errMess: null, articles: action.payload};
        case ActionTypes.ARTICLES_LOADING:
            return {...state, isLoading: true, errMess: null, articles: []};
        case ActionTypes.ARTICLES_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;        
    }                                    
};