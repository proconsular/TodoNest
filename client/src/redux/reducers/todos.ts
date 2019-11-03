import { Actions } from "../constants/actions";
import { Todo } from "../constants/types";

export default (state: {[id: number]: Todo} = {}, action: any) => {
    switch(action.type as Actions) {
        case Actions.GET_TODOS: {
            return Object.assign({}, action.payload)
        }
        case Actions.CREATE_TODO: {
            let next = Object.assign({}, state)
            let todo = action.payload as Todo
            next = {
                ...next,
                [todo.id]: todo
            }
            return next
        }
        case Actions.UPDATE_TODO: {
            let next = Object.assign({}, state)
            let todo = action.payload as Todo
            next = {
                ...next,
                [todo.id]: {
                    ...next[todo.id],
                    ...todo,
                }
            }
            return next
        }
        case Actions.DELETE_TODO: {
            let next = Object.assign({}, state) 
            delete next[action.payload.id]
            return next
        }
        default: {
            return state
        }
    }
}