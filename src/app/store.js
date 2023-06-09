import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import userReducer from './UserSlice';
import { throttle } from 'lodash';

// const rootReducer = combineReducers({
//   cart: { cartReducer },
//   user: { userReducer },
// });

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = throttle((state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (err) {}
}, 1000);

const persistedState = loadState();
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
