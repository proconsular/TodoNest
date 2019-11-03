import { combineReducers } from 'redux'

import session from './session'
import todos from './todos'

export default combineReducers({
    session,
    todos,
})