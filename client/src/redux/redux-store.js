import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./reducers/auth-reducer";
import cardsReducer from "./reducers/cards-reducer";
import errorReducer from "./reducers/error-reducer";
import addCardReducer from "./reducers/add-card-reducer";
import thunkMiddleware from "redux-thunk"

const reducers = combineReducers({
    auth: authReducer,
    cardsReducer,
    error: errorReducer,
    addCard: addCardReducer
})

const store = createStore(reducers,
    compose(applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;