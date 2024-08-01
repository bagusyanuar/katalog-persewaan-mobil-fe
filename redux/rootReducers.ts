import { combineReducers } from 'redux'
import login from './login/slice'
import register from './register/slice'
// import category from './category/slice'
// import motorbikeCategory from './motorbike-category/slice'

const rootReducer = combineReducers({
    login,
    register,
    // category,
    // motorbikeCategory,
})

export default rootReducer