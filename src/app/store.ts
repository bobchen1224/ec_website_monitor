import { configureStore } from "@reduxjs/toolkit";
import dataHandleReducer from "../models/dataHandle";
import styleSwitchReducer from "../models/styleSwitch";

export const store = configureStore({
    reducer: {
        dataHandle: dataHandleReducer,
        styleSwitch: styleSwitchReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;