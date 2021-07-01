import * as ActionTypes from "./ActionTypes";


export const classList = (state = { errMess: null, classList: [] }, action) => {
    switch(action.type){            
        case ActionTypes.POST_SIGN_UP:
            const list = action.payload;
            list.id = state.classList.length;
            return{...state, classList: state.classList.concat(list)};
        case ActionTypes.DELETE_SIGN_UP:
            const newDel = action.payload;
            const toCut = state.classList.indexOf(newDel.course && newDel.name);
            return{...state, classList: state.classList.splice(toCut, 1)}
            
            

        default:
            return state;        
    }                                    
};