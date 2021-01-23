import axios from "axios";
import {ADD_CARD_LOADING, ADD_CARD_SUCCESS, ADD_CARD_FAIL} from "./types";
import {returnErrors} from "./error-actions";
import {tokenConfig} from "./auth-actions"

const multipartConfig = (getState) => {
    const config = tokenConfig(getState);
    config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
    }
    return config
}

export const addCard = ({title, price, description, images, titleImg}) => (dispatch, getState) => {
    dispatch({type: ADD_CARD_LOADING});

    const body = new FormData();

    body.append("title", title);
    body.append("price", price);
    body.append("description", description);
    body.append("titleImg", titleImg);
    images.forEach(img => body.append("images", img));

    axios.post("card/add", body, multipartConfig(getState))
        .then(res => {
            dispatch({type: ADD_CARD_SUCCESS, payload: res.data});
        })
        .catch(err => {
            console.log(err.request, err.response)
            dispatch(returnErrors(err.response.data.msg, err.response.status, "ADD_CARD_FAIL"));
            dispatch({type: ADD_CARD_FAIL});
        })
}