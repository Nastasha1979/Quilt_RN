import * as ActionTypes from "./ActionTypes";


export const classList = (state = { errMess: null, classList: [] }, action) => {
    switch(action.type){            
        case ActionTypes.POST_SIGN_UP:
            const list = action.payload;
            list.id = state.classList.length - 1;
            return{...state, classList: state.classList.concat(list)};
        case ActionTypes.GET_CLASS_LIST:
            return {...state, errMess: null, classList: action.payload};
        default:
            return state;        
    }                                    
};