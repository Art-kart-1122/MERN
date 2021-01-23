import {ADD_CARD_LOADING,
    ADD_CARD_SUCCESS, ADD_CARD_FAIL} from "../actions/types";


const initialState = {
    cardId: null,
    isLoading: false
}

const AddCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD_LOADING :
            return {
                ...state,
                isLoading: true
            }
        case ADD_CARD_SUCCESS:
            return {
                cardId: action.payload,
                isLoading: false
            }
        case ADD_CARD_FAIL:
            return {
                cardId: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default AddCardReducer;


