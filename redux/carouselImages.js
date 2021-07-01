import * as ActionTypes from "./ActionTypes";


export const carouselImages = (state = { isLoading: false, errMess: null, carouselImages: [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_CAROUSEL_IMAGES:
            return {...state, isLoading: false, errMess: null, carouselImages: action.payload};
        case ActionTypes.CAROUSEL_IMAGES_LOADING:
            return {...state, isLoading: true,  errMess: null, carouselImages: []};
        case ActionTypes.CAROUSEL_IMAGES_FAILED: 
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;        
    }                                    
};