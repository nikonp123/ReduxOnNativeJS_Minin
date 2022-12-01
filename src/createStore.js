export function createStore(rootReducer, initialState) {
    //private variable
    //for closure
    let state = rootReducer(initialState, {type:'__INIT__'});
    const subscribers = [];

    return {
        //pattern Observer

        //action === {type:'INCREMENT'}
        dispatch(action) {
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub())               
        },
        subscribe(callback) {
            subscribers.push(callback);
        }, 
        getState() {
            return state
        }
    }    
}