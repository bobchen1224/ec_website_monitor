import { configureStore } from "@reduxjs/toolkit";
import dataHandleReducer from "../models/dataHandle.ts";

export const store = configureStore({
    reducer: {
        dataHandle: dataHandleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;