import { takeLatest, put } from 'redux-saga/effects'
import { Actions, sendStore } from '../constants/actions'
import { Request, Methods } from '../utils/request'
import { Todo } from '../constants/types'

export function* getTodos() {
    yield takeLatest(Actions.GET_TODOS.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.get, `/api/todos?user=${action.payload.userId}`)
            request.setToken(action.token)
            const response = yield request.send()
            if (!response.ok) {
                throw new Error("Error getting todos.")
            }
            const data = (yield response.json()) as Todo[]
            const map: {[id: number]: Todo} = {}
            for (let i = 0; i < data.length; i++) {
                map[data[i].id] = data[i]
            }
            yield put(sendStore(Actions.GET_TODOS, map))
        } catch (err) {
            console.log(err)
        }
    })
}

export function* createTodo() {
    yield takeLatest(Actions.CREATE_TODO.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.post, `/api/todos`)
            request.setToken(action.token)
            const response = yield request.send(action.payload)
            if (!response.ok) {
                throw new Error("Error creating todo.")
            }
            const data = yield response.json()
            yield put(sendStore(Actions.CREATE_TODO, data))
        } catch (err) {
            console.log(err)
        }
    })
}

export function* updateTodo() {
    yield takeLatest(Actions.UPDATE_TODO.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.put, `/api/todos/${action.payload.id}`)
            request.setToken(action.token)
            const response = yield request.send(action.payload)
            if (!response.ok) {
                throw new Error("Error updating todo.")
            }
            // const data = yield response.json()
            yield put(sendStore(Actions.UPDATE_TODO, action.payload))
        } catch (err) {
            console.log(err)
        }
    })
}


export function* deleteTodo() {
    yield takeLatest(Actions.DELETE_TODO.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.delete, `/api/todos/${action.payload.id}`)
            request.setToken(action.token)
            const response = yield request.send()
            if (!response.ok) {
                throw new Error("Error deleting todo.")
            }
            // const data = yield response.json()
            yield put(sendStore(Actions.DELETE_TODO, action.payload))
        } catch (err) {
            console.log(err)
        }
    })
}