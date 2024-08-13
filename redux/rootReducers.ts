import { combineReducers } from 'redux'
import login from './login/slice'
import logout from './logout/slice'
import register from './register/slice'
import mapArea from './map-area/slice'
import memberMerchant from './member/merchant/slice'
import memberCart from './member/cart/slice'
import memberRent from './member/rent/slice'
import memberProfile from './member/profile/slice'
import merchantLogin from './merchant/login/slice'
import merchantRegister from './merchant/register/slice'
import merchantProduct from './merchant/product/slice'
import merchantDriver from './merchant/driver/slice'
import merchantOrder from './merchant/order/slice'
import merchantProfile from './merchant/profile/slice'
import adminLogin from './admin/login/slice'
import adminMember from './admin/member/slice'
import adminMerchant from './admin/merchant/slice'
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
    merchantLogin,
    merchantRegister,
    merchantProduct,
    merchantDriver,
    merchantOrder,
    merchantProfile,
    adminLogin,
    adminMember,
    adminMerchant
    // category,
    // motorbikeCategory,
})

export default rootReducer