import axios from "axios";
import {USER_LOADING, USER_LOADED,
    AUTH_ERROR, LOGOUT_SUCCESS, LOGIN_SUCCESS,
    LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL} from "./types";
import {returnErrors} from "./error-actions";

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get("auth/user", tokenConfig(getState))
        .then(res => dispatch({type: USER_LOADED, payload: res.data}))
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
}

export const tokenConfig = getState => {
    const config = getConfig();

    const token = getState().auth.token;
    if(token) config.headers["x-auth-token"] = token;

    return config
}

const getConfig = () => {
    return {
        headers: {
            "Content-type": "application/json"
        }
    }
}

export const register = ({email, name, password, confirm}) => (dispatch) => {

    dispatch({type: USER_LOADING});
    const body = JSON.stringify({email, name, password, confirm});

    axios.post("auth/register", body, getConfig())
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, "REGISTER_FAIL"));
            dispatch({type: REGISTER_FAIL});
        })
}

export const login = ({email, password}) =>  (dispatch) => {

    dispatch({type: USER_LOADING});
    const body = JSON.stringify({email, password});

    axios.post("/auth/login", body, getConfig())
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL"));
            dispatch({type: LOGIN_FAIL});
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}