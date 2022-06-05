// // here i need to feetch a list of users from an api end point and store it in the redux store 
// const redux=require('redux');
// const createStore=redux.createStore;
// const applyMiddleware=redux.applyMiddleware;
// const thunkMiddleware=require('redux-thunk');
// const axios=require('axios');
// const initialState={
//     loading:false,
//     users:[],
//     error:''
// }
// const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST';
// const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS';
// const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE';//action type

// // action creator
// const fetchUsersRequest=()=>{
//     return{
//    type:FETCH_USERS_REQUEST
//     }
// }
// const fetchUsersSuccess=(users)=>{
//     return{
//    type:FETCH_USERS_SUCCESS,
//    payload:users
//     }
// }

// const fetchUsersFailure=(error)=>{
//     return{
//    type:FETCH_USERS_FAILURE,
//    payload:error
//     }
// }

// // here i explain reducer

// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//        case FETCH_USERS_REQUEST: return{
//             ...state,
//             loading:true
//         }
//         case FETCH_USERS_SUCCESS:return{
           
//             loading:false,
//             users:action.payload,
//             error:''
//         }
//         case FETCH_USERS_FAILURE:return{
//             loading:false,
//             users:[],
//             error:action.payload
//         }
//     }
// }
// // action creator   by redux-thuk
// const fetchUsers=()=>{
//     return function(dispatch){
//           dispatch(fetchUsersRequest())
//           axios
//           .get('https://jsonplaceholder.typicode.com/users')
//           .then(response=>{
// // response.data is the array of users
//   const users=response.data.map(user=>user.id)
//   dispatch(fetchUsersSuccess(users))
//           })
//           .catch(error=>{
//             //   error.message is the error description
//             dispatch(fetchUsersFailure(error.message))
//           })
//     }
// }

// const store=createStore(reducer,applyMiddleware(thunkMiddleware));
// store.subscribe(()=>{console.log(store.getState())});
// store.dispatch(fetchUsers());



const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the users
        const users = response.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(fetchUsers())