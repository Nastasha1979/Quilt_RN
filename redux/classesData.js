import * as ActionTypes from "./ActionTypes";


export const classesData = (state = { isLoading: false, errMess: null, classesData: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_CLASSES:
            return {...state, isLoading: false, errMess: null, classesData: action.payload};
        case ActionTypes.CLASSES_LOADING:
            return {...state, isLoading: true, errMess: null, classesData: []};
        case ActionTypes.CLASSES_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;        
    }                                    
};