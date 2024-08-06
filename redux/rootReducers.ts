import { combineReducers } from 'redux'
import login from './login/slice'
import logout from './logout/slice'
import register from './register/slice'
import mapArea from './map-area/slice'
import memberMerchant from './member/merchant/slice'
import memberCart from './member/cart/slice'
import memberRent from './member/rent/slice'
import memberProfile from './member/profile/slice'
import merchantProduct from './merchant/product/slice'
// import category from './category/slice'
// import motorbikeCategory from './motorbike-category/slice'

const rootReducer = combineReducers({
    login,
    logout,
    register,
    mapArea,
    memberMerchant,
    memberCart,
    memberRent,
    memberProfile,
    merchantProduct
    // category,
    // motorbikeCategory,
})

export default rootReducer