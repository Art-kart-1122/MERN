
const SET_TOTAL_COUNT_ITEMS = "SET_TOTAL_COUNT_ITEMS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT_ON_PAGE_ITEMS = "SET_COUNT_ON_PAGE_ITEMS";


const initialState = {
    cards: [
        {id: 2, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"},
        {id: 3, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"},
        {id: 4, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"},
        {id: 5, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"},
        {id: 6, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"},
        {id: 7, img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", title: "Europe Street beat", price: "10000"}
        ],
    totalItems: 6
}



const cardsReducer = (state = initialState, action) => {
    switch (action.type) {

        default: {
            return state;
        }
    }
}

export default cardsReducer;