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
  USER_UPDATEPROFILE_FAIL
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