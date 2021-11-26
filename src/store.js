import { createStore } from "redux";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function reducer(state = { product: {}}, action) {
    switch(action.type) {
        case 'setProduct': {
            return {...state, product: action.payload}
        }
        default: {
            return state
        }
    }
}

const store = createStore(reducer, reduxDevTools);

export default store;
