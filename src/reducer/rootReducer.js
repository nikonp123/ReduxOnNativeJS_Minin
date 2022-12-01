import { combineReducers } from "redux";
import { ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, INCREMENT, THEME_DARK, THEME_LIGHT, ENABLE_BUTTONS, DISABLE_BUTTONS } from "./types.js";

function counterReducer(state=0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1
        case DECREMENT:
            return state - 1
        case ASYNC_INCREMENT:
            return state + 10
        default:
            return state;
    }
}

const initialThemeState = {value: THEME_LIGHT};

function themeReducer(state=initialThemeState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}    
        default:
            return state;
    }
}

function availabilityButtons(state=true, action) {
    switch (action.type) {
        case ENABLE_BUTTONS:
            return true;    
        case DISABLE_BUTTONS:
            return false;    
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
    available: availabilityButtons
});