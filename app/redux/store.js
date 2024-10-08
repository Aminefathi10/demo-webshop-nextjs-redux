import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basket/basketSlice';
import favoriteRducer from './features/favorite/fovoriteSlice';
import locationReducer from './features/location/locationSlice';
import userReducer from './features/user/userSlice'


export const store = configureStore({
    reducer: {
        basket: basketReducer,
        favorite: favoriteRducer,
        location: locationReducer,
        user: userReducer
    }
})