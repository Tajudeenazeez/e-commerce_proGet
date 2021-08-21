import axios from "axios"
import { ORDER_DISPLAY_RESET } from "../constants/orderConstants"
import { 
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATEPROFILE_FAIL, 
  USER_UPDATEPROFILE_REQUEST, 
  USER_UPDATEPROFILE_SUCCESS, 
  USER_USERDETAIL_FAIL, 
  USER_USERDETAIL_REQUEST,
  USER_USERDETAIL_RESET,
  USER_USERDETAIL_SUCCESS
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const {data} = await axios.post(
      '/api/users/login',
      {email, password},
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data

    })
    localStorage.setItem('userInfo', JSON.stringify(data))


  } catch (error){
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT})
  dispatch({ type: USER_USERDETAIL_RESET})
  dispatch({ type: ORDER_DISPLAY_RESET})
  dispatch({ type: USER_LIST_RESET})


}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const {data} = await axios.post(
      '/api/users',
      {name, email, password},
      config
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data

    })
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data

    })

    localStorage.setItem('userInfo', JSON.stringify(data))


  } catch (error){
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const getUserDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_USERDETAIL_REQUEST
    })
  const {useLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get( 
      `/api/users/${id}`,config
    )
    dispatch({
      type: USER_USERDETAIL_SUCCESS,
      payload: data

    })

  } catch (error){
    dispatch({
      type: USER_USERDETAIL_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}



export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATEPROFILE_REQUEST
    })
  const {useLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put( 
      `/api/users/profile`, user,config
    )
    dispatch({
      type: USER_UPDATEPROFILE_SUCCESS,
      payload: data

    })

  } catch (error){
    dispatch({
      type: USER_UPDATEPROFILE_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
  const {useLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get( 
      `/api/users`, config
    )
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data

    })

  } catch (error){
    dispatch({
      type: USER_LIST_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}
