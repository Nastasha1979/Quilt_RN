import * as ActionTypes from "./ActionTypes";


export const frequently = (state = { isLoading: false, errMess: null, frequently: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_QUESTIONS:
            return {...state, isLoading: false, errMess: null, frequently: action.payload};
        case ActionTypes.QUESTIONS_LOADING:
            return {...state, isLoading: true, errMess: null,frequently: []};
        case ActionTypes.QUESTIONS_FAILED: 
            return {...state, isLoading: false, errmMess: true, frequently: []};
        default:
            return state;        
    }                                    
};