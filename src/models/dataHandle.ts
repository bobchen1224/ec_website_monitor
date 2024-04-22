import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
    loadingStatus: boolean
};

const initialState: LoadingState = {
    loadingStatus: false
};

export const dataHandleSlice = createSlice({
    name: 'dataHandle',
    initialState,
    reducers: {
        enableLoading: state => {
            state.loadingStatus = true;
        },
        disableLoading: state => {
            state.loadingStatus = false;
        },
    }
});

export const { enableLoading, disableLoading } = dataHandleSlice.actions;

export default dataHandleSlice.reducer;