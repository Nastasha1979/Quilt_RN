import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";


export const fetchClasses = () => dispatch => {
    
    dispatch(classesLoading());

    return fetch(baseUrl + "classesData")
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

export const addClasses = classesData => ({
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





export const fetchCarouselImages = () => dispatch => {

    dispatch(carouselImagesLoading());

    return fetch(baseUrl + 'carouselImages')
    .then(response => {
        if(response.ok) {
            console.log("In Fetch Carousel Images. response OK");
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
    .then(response => dispatch(addCarouselImages(response)))
    .catch(error => console.log("fetch Carousel Images ", error.message));
};


export const addCarouselImages = carouselImages => ({
    type: ActionTypes.ADD_CAROUSEL_IMAGES,
    payload: carouselImages
});

export const carouselImagesLoading = () => ({
    type: ActionTypes.CAROUSEL_IMAGES_LOADING
});

export const carouselImagesFailed = errMess => ({
    type: ActionTypes.CAROUSEL_IMAGES_FAILED,
    payload: errMess
});

export const postCarousel = (header, caption, src) => dispatch => {
    const newCarouselImage = {
        header,
        caption,
        src,
        altText: "User Submitted Image"
    };

    return fetch(baseUrl + "carousel", {
        method: "POST",
        body: JSON.stringify(newCarouselImage),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addCarouselImage(response)))
    .catch(error => {
        console.log("post carousel Image", error.message);
    });
};

export const addCarouselImage = newCarouselImage => ({
    type: ActionTypes.ADD_CAROUSEL_IMAGE,
    payload: newCarouselImage
});



export const postFavoriteClass = classInfoId => dispatch => {
    setTimeout(() => {
        dispatch(addFavoriteClass(classInfoId));
    }, 500);
};

export const addFavoriteClass = classInfoId => ({
    type: ActionTypes.ADD_FAVORITE_CLASS,
    payload: classInfoId
});

export const deleteFavoriteClass = classInfoId => ({
    type: ActionTypes.DELETE_FAVORITE_CLASS,
    payload: classInfoId
});

export const postFavoriteArticle = articleId => dispatch => {
    setTimeout(() => {
        dispatch(addFavoriteArticle(articleId));
    }, 500);
};

export const addFavoriteArticle = articleId => ({
    type: ActionTypes.ADD_FAVORITE_ARTICLE,
    payload: articleId
});

export const deleteFavoriteArticle = articleId => ({
    type: ActionTypes.DELETE_FAVORITE_ARTICLE,
    payload: articleId
});



export const postComment = (classId, header, body) => dispatch => {
    const newComment = {
        classId,
        header,
        body,
        date: new Date().toISOString()
    };

    return fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log("post comment", error.message);
    });
};

export const addComment = comment => ({
    type: ActionTypes.ADD_NEW_COMMENT,
    payload: comment
});


export const postSignUp = (course, name, signUp, isEnabled) => dispatch => {
    const newSignUp = {
        signUp,
        course,
        name,
        isEnabled: isEnabled,
        date: new Date().toISOString()
    };

    return fetch(baseUrl + "classList", {
        method: "POST",
        body: JSON.stringify(newSignUp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addSignUp(response)))
    .catch(error => {
        console.log("post Sign Up", error.message);
    });
};


export const addSignUp = newSignUp => ({
    type: ActionTypes.POST_SIGN_UP,
    payload: newSignUp
});



