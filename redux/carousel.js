import * as ActionTypes from "./ActionTypes";


export const carousel = (state = { isLoading: false, errMess: null, carousel: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_CAROUSEL:
            return {...state, isLoading: false, errMess: null, carousel: action.payload};
        case ActionTypes.CAROUSEL_LOADING:
            return {...state, isLoading: true, errMess: null, carousel: []};
        case ActionTypes.CAROUSEL_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;        
    }                                    
};