import commentSlice from './reducers/commentsSlice';
import authReducer from './reducers/authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import postSlice from './reducers/postSlice';
import groupSlice from './reducers/groupSlice';

const rootReducer = combineReducers({
    authReducer, postSlice, commentSlice, groupSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']