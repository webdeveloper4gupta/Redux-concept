const redux=require('redux');//here i import nodemodule redux
const createStore=redux.createStore;
const reduxLogger=require('redux-logger');
const logger=reduxLogger.createLogger();
const applyMiddleware=redux.applyMiddleware;
// action creater'
const buy_cake='BUY_CAKE';  
const buy_icecream='BUY_ICECREAM';
function buyCake(){
    return{//action
        type:buy_cake,
        info:'First redux action'
    
    }   
}
function buyicecream(){
    return{
        type:buy_icecream,
        info:'Second redux action'
    }
}

// (previousstate,action)=>new state
// reducer
// const initialState={
//     numofCakes:10
// }
const initialCakeState={
    numofCakes:10
}
const initialIcecream={
    numoficecream:20
}
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case buy_cake:return{
//             ...state   ,//means making a copy of previous state
//             numofCakes:state.numofCakes-1
//         }
//         default: return state
//     }
// }

const Cakereducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case buy_cake:return{
            ...state   ,//means making a copy of previous state
            numofCakes:state.numofCakes-1
        }
        default: return state
    }
}
const Icecreamreducer=(state=initialIcecream,action)=>{
    switch(action.type){
        case buy_icecream:return{
            ...state   ,//means making a copy of previous state
            numoficecream:state.numoficecream-1
        }
        default: return state
    }
}

// const store=createStore(Cakereducer);//creatStore method accept only one reducer
const combineReducer=redux.combineReducers({
    cake:Cakereducer,
    icecream:Icecreamreducer
});
const store=createStore(combineReducer,applyMiddleware(logger))
console.log("intitial state",store.getState())
// store.subscribe(()=>console.log('updated state',store.getState()));
const unsubscibe=store.subscribe(()=>{});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyicecream())
// unsubscribe()//to disconnect connection 