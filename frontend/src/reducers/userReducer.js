import { 
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_USERDETAIL_REQUEST,
  USER_USERDETAIL_SUCCESS,
  USER_USERDETAIL_FAIL,
  USER_UPDATEPROFILE_REQUEST,
  USER_UPDATEPROFILE_SUCCESS,
  USER_UPDATEPROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) =>{
  switch(action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload}
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
      default: 
      return state
  }
}


export const userRegisterReducer = (state = {}, action) =>{
  switch(action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload}
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
      default: 
      return state
  }
}


export const userDetailReducer = (state = { user:{}}, action) =>{
  switch(action.type) {
    case USER_USERDETAIL_REQUEST:
      return {...state, loading: true }
    case USER_USERDETAIL_SUCCESS:
      return { loading: false, user: action.payload}
    case USER_USERDETAIL_FAIL:
      return { loading: false, error: action.payload }
      default: 
      return state
  }
}


export const updateProfileReducer = (state = {}, action) =>{
  switch(action.type) {
    case USER_UPDATEPROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATEPROFILE_SUCCESS:
      return { loading: false, success:true, userInfo: action.payload}
    case USER_UPDATEPROFILE_FAIL:
      return { loading: false, error: action.payload }
      default: 
      return state
  }
}

export const userListReducer = (state = {users:[]}, action) =>{
  switch(action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload}
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
      case USER_LIST_RESET:
        return { users:[] }
      default: 
      return state
  }
}

export const userDeleteReducer = (state = {}, action) =>{
  switch(action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success:true}
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
      default: 
      return state
  }
} 

export const userUpdateReducer = (state = {userInfo:{}}, action) =>{
  switch(action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success:true}
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return { userInfo:{}}
      default:
      return state
  }
} 