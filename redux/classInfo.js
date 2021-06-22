import * as ActionTypes from "./ActionTypes";


export const classInfo = (state = { isLoading: false, errMess: null, classInfo: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_CLASSINFO:
            return {...state, isLoading: false, errMess: null, classInfo: action.payload};
        case ActionTypes.CLASSINFO_LOADING:
            return {...state, isLoading: true, errMess: null, classInfo: []};
        case ActionTypes.CLASSINFO_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;        
    }                                    
};