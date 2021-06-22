import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchClasses = () => dispatch => {

    dispatch(classesLoading());

    return fetch(baseUrl + "classes")
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(classesData => dispatch(addClasses(classesData)))
    .catch(error => dispatch(classesFailed(error.message)));
};

export const classesLoading = () => ({
    type: ActionTypes.CLASSES_LOADING
});

export const classesFailed = errMess => ({
    type: ActionTypes.CLASSES_FAILED,
    payload: errMess
});

export const addClasses = classes => ({
    type: ActionTypes.ADD_CLASSES,
    payload: classesData
});




export const fetchClassInfo = () => dispatch => {

    dispatch(classInfoLoading());

    return fetch(baseUrl + "classInfo")
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(classInfo => dispatch(addClassInfo(classInfo)))
    .catch(error => dispatch(classInfoFailed(error.message)));
};

export const classInfoLoading = () => ({
    type: ActionTypes.CLASSINFO_LOADING
});

export const classInfoFailed = errMess => ({
    type: ActionTypes.CLASSINFO_FAILED,
    payload: errMess
});

export const addClassInfo = classInfo => ({
    type: ActionTypes.ADD_CLASSINFO,
    payload: classInfo
});




export const fetchArticles = () => dispatch => {

    dispatch(articlesLoading());

    return fetch(baseUrl + "articles")
        .then(response => {
            if(response.ok){
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(articles => dispatch(addArticles(articles)))
        .catch(error => dispatch(articlesFailed(error.message)));
};

export const articlesLoading = () => ({
    type: ActionTypes.ARTICLES_LOADING
});

export const articlesFailed = errMess => ({
    type: ActionTypes.ARTICLES_FAILED,
    payload: errMess
});

export const addArticles = articles => ({
    type: ActionTypes.ADD_ARTICLES,
    payload: articles
});





export const fetchComments = () => dispatch => {

    dispatch(loadComments());

    return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const loadComments = () => ({
    type: ActionTypes.LOAD_COMMENTS
});

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



export const fetchCarousel = () => dispatch => {

    dispatch(carouselLoading());

    return fetch(baseUrl + 'carousel')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(carousel => dispatch(addCarousel(carousel)))
    .catch(error => dispatch(carouselFailed(error.message)));
};

export const carouselLoading = () => ({
    type: ActionTypes.CAROUSEL_LOADING
});

export const carouselFailed = errMess => ({
    type: ActionTypes.CAROUSEL_FAILED,
    payload: errMess
});

export const addCarousel = carousel => ({
    type: ActionTypes.ADD_CAROUSEL,
    payload: carousel
});





export const postFavorite = classInfoId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(classInfoId));
    }, 1000);
};

export const addFavorite = classInfoId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: classInfoId
});