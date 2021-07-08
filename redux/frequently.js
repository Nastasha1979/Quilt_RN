import * as ActionTypes from "./ActionTypes";


export const frequently = (state = { isLoading: false, frequently: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_QUESTIONS:
            return {...state, isLoading: false, frequently: action.payload};
        case ActionTypes.QUESTIONS_LOADING:
            return {...state, isLoading: true, frequently: []};
        default:
            return state;        
    }                                    
};