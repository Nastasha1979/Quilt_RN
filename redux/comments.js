import * as ActionTypes from "./ActionTypes";


export const comments = (state = { isLoading: false, errMess: null, comments: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};
        case ActionTypes.LOAD_COMMENTS:
            return {...state, isLoading: true, errMess: null, comments: []};
        case ActionTypes.COMMENTS_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};        
        default:
            return state;        
    }                                    
};