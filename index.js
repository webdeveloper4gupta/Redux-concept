const redux=require('redux');//here i import nodemodule redux
const createStore=redux.createStore;
// action creater'
const buy_cake='BUY_CAKE';  
function buyCake(){
    return{//action
        type:buy_cake,
        info:'First redux action'
    
    }   
}

// (previousstate,action)=>new state
// reducer
const initialState={
    numofCakes:10
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case buy_cake:return{
            ...state   ,//means making a copy of previous state
            numofCakes:state.numofCakes-1
        }
        default: return state
    }
}

const store=createStore(reducer);
console.log("intitial state",store.getState())
store.subscribe(()=>console.log('updated state',store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe()//to disconnect connection 