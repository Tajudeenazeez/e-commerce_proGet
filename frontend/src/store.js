import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import { 
  productListReducer, 
  productDetailsReducer, 
  productCreateReducer, 
  productDeleteReducer,
  productUpdateReducer,
  productCreateReviewReducer} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducers'
import { 
  userDetailReducer, 
  userLoginReducer, 
  userRegisterReducer,
  updateProfileReducer, 
  userListReducer, 
  userDeleteReducer, 
  userUpdateReducer 
} from "./reducers/userReducer";
import { 
  orderCreateReducer, 
  orderDeliverReducer, 
  orderDetailsReducer, 
  orderDisplayReducer,
  orderListMyReducer, 
  orderListReducer, 
  orderPayReducer } from './reducers/orderReducer'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  updateProfile: updateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderDisplay: orderDisplayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,

})

const cartItemsFromStorage =localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItem')) : [] 

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
? JSON.parse(localStorage.getItem('shippingAddress'))
: {}

const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage, 
    shippingAddress: shippingAddressFromStorage
  },
 userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store