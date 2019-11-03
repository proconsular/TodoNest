import { Session } from "../constants/types"
import { Actions } from "../constants/actions"

interface Action {
    type: string,
    payload: any,
}

const nullSession: Session = {
    id: 0,
    username: "",
    token: "",
    online: false,
}

export default (state: Session = Object.assign({}, nullSession), action: any) => {
    switch(action.type) {
        case Actions.SIGNIN_SUCCEEDED: {
            let next = Object.assign({}, state)

            next = {
                ...next,
                id: action.payload.id,
                username: action.payload.username,
                token: action.payload.token,
                online: true,
            }

            localStorage.setItem('session', JSON.stringify(next))

            return next
        }
        case Actions.LOAD_SESSION: {
            let data = localStorage.getItem('session')
            if (data) {
                return Object.assign({}, JSON.parse(data))
            }
            return state
        }
        case Actions.SIGNOUT_SUCCEEDED: {
            localStorage.removeItem('session')
            return Object.assign({}, nullSession)
        }
        default: {
            return state
        }
    }
}