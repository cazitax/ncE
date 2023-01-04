import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({});

// save data even you refresh stupid btch
const initialStore = {
    cartReducer: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [] 
    }
}
export const store = createStore(
    rootReducer,initialStore,
    composeEnhancers()
);