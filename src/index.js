// https://www.youtube.com/watch?v=YdYyYMFPa44
import { applyMiddleware, compose } from "redux";
import { createStore } from "redux";
import logger from "redux-logger";
// import { createStore } from "./createStore.js";
import { rootReducer } from "./reducer/rootReducer.js";
import {asyncIncrement, changeTheme, decrement, increment, themeDARK, themeLIGHT} from './reducer/actions.js'
import thunk from 'redux-thunk'
import './styles.css'

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

function myLogger(state) {
    console.log('---logger---')
    console.log('state: ',state)
    return function(next) {
        console.log('next: ',next)
        return function(action){
            console.log('---logger last---')
            console.log('action: ',action)
            console.log('Prev state: ',state)
            console.log(next);
            const NewState = next(action);
            console.log(NewState);
            return NewState;
        }
    }
    
}

// console.log('myLogger');
// myLogger();

// const store = createStore(rootReducer, applyMiddleware(thunk));

//старый способ devtools
const comp = compose(applyMiddleware(thunk,myLogger,logger),window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer,undefined,comp);   

// composeWithDevTools - юзать вот это!



// const store = createStore(
//     rootReducer, 
//     compose(applyMiddleware(thunk,myLogger,logger)), undefined, window.__REDUX_DEVTOOLS_EXTENSION__
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : args => args,
//     );
// const store = createStore(rootReducer, applyMiddleware(thunk,myLogger,logger));
// const store = createStore(rootReducer,0);
// window.store=store;



addBtn.addEventListener('click',()=> {
    store.dispatch(increment());
});

subBtn.addEventListener('click',()=> {
    store.dispatch(decrement());
});

asyncBtn.addEventListener('click',()=>{
    store.dispatch(asyncIncrement())
});

themeBtn.addEventListener('click',()=>{
    // let currentAction = themeDARK; 
    // if (document.body.classList.contains('THEME_DARK')) {
    //     currentAction = themeLIGHT;
    // }

    const nextTheme = document.body.classList.contains('THEME_DARK')
    ? 'THEME_LIGHT'
    : 'THEME_DARK';

    store.dispatch(changeTheme(nextTheme)); 
})

store.subscribe(()=>{
    // console.log(store.getState()
    counter.textContent=store.getState().counter;
    document.body.classList=store.getState().theme.value;
    const disable = !store.getState().available;
    [addBtn,subBtn,asyncBtn,themeBtn].forEach(btn=>btn.disabled = disable);
});

//initial state
store.dispatch({type:'А бы шо. Вернет начальное стостояние'})

