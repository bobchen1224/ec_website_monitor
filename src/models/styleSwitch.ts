import { createSlice } from "@reduxjs/toolkit";

const cssRoot = document.documentElement;
const globalStyle = getComputedStyle(cssRoot);
const mainBGColor = globalStyle.getPropertyValue('--mainComponentBackgroundColor');

export interface StyleState {
    mainBackgroundColor: string,
    styleMode: string,
};

const initialState: StyleState = {
    mainBackgroundColor: mainBGColor,
    styleMode: 'night'
};

export const styleSwitch = createSlice({
    name: 'styleSwtich',
    initialState,
    reducers: {
        switchBgColor: state => {
            if(state.styleMode === 'night') {
                cssRoot.style.setProperty('--mainBorderColor', 'white');
                cssRoot.style.setProperty('--mainBoxShadowColor', 'transparent');
                cssRoot.style.setProperty('--mainComponentBackgroundColor', '#333333');
                cssRoot.style.setProperty('--baseBackgroundColor', '#888888');
                cssRoot.style.setProperty('--navbarBackgroundColor', '#111111');
                state.mainBackgroundColor = '#333333';
                state.styleMode = 'day';
            } else {
                cssRoot.style.setProperty('--mainBorderColor', 'aqua');
                cssRoot.style.setProperty('--mainBoxShadowColor', 'aqua');
                cssRoot.style.setProperty('--mainComponentBackgroundColor', '#0C1427');
                cssRoot.style.setProperty('--baseBackgroundColor', '#070D19');
                cssRoot.style.setProperty('--navbarBackgroundColor', '#0E2545');
                state.mainBackgroundColor = '#0C1427';
                state.styleMode = 'night';
            };
            return state; 
        },
    },
});

export const { switchBgColor } = styleSwitch.actions;

export default styleSwitch.reducer;