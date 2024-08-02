import { combineReducers } from 'redux'
import login from './login/slice'
import register from './register/slice'
import mapArea from './map-area/slice'
import memberMerchant from './member/merchant/slice'
// import category from './category/slice'
// import motorbikeCategory from './motorbike-category/slice'

const rootReducer = combineReducers({
    login,
    register,
    mapArea,
    memberMerchant
    // category,
    // motorbikeCategory,
})

export default rootReducer