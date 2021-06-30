import * as ActionTypes from "./ActionTypes";


export const comments = (state = { isLoading: false, errMess: null, comments: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionTypes.LOAD_COMMENTS:
            return {...state, isLoading: true, errMess: null, comments: []};

        case ActionTypes.COMMENTS_FAILED: 
            return {...state, isLoading: false, errMess: action.payload}; 
            
        case ActionTypes.ADD_NEW_COMMENT:
            const comment = action.payload;
            comment.id = state.comments.length;
            comment.avatar = "assets/genericUser.png";
            comment.author = "generic";
            return{...state, comments: state.comments.concat(comment)};

        default:
            return state;        
    }                                    
};