import * as ActionTypes from "./ActionTypes";


export const classList = (state = { errMess: null, classList: [] }, action) => {
    switch(action.type){            
        case ActionTypes.POST_SIGN_UP:
            const list = action.payload;
            list.id = state.classList.length;
            return{...state, classList: state.classList.concat(list)};
        case ActionTypes.DELETE_SIGN_UP:
            const toDelete = action.payload;
            if(state.classList.find(toDelete.name) && state.classList.find(course) && signUp === true) {
                return{...state, classList: state.classList.signUp = false}  //the logic on this is wrong. revise
            } else {
                return state;
            }
            
        default:
            return state;        
    }                                    
};