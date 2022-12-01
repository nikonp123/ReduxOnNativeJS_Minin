import { INCREMENT,DECREMENT, ASYNC_INCREMENT, THEME_DARK, THEME_LIGHT, CHANGE_THEME, ENABLE_BUTTONS, DISABLE_BUTTONS } from "./types.js"

export function increment()  {
    return {type: INCREMENT}
}

export function decrement()  {
    return {type: DECREMENT}
}



export function themeDARK() {
    return {type: THEME_DARK}
}

export function themeLIGHT() {
    return {type: THEME_LIGHT}
}

//second path
export function changeTheme(nextTheme) {
    return {
        type: CHANGE_THEME,
        payload: nextTheme
    }

}

export function enableButtons() {
    return {
        type: ENABLE_BUTTONS
    }
}

export function disableButtons() {
    return {
        type: DISABLE_BUTTONS
    }
}

export function asyncIncrement() {
    return function(dispatch) {
        dispatch(disableButtons());
        setTimeout(()=>{
            dispatch({type: ASYNC_INCREMENT})
            dispatch(enableButtons());
        },1000)
    };
}