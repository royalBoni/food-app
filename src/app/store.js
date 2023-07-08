import { configureStore } from "@reduxjs/toolkit";
import { apiSlice} from "../features/api/apiSlice";
import promptMessageReducer from "../features/actions/actionStateSlice";

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        promptMessage:promptMessageReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
    
})