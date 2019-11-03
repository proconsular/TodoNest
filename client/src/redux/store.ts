import { createStore, applyMiddleware } from "redux"

import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import { initSagas } from "./sagas"

import { Guard } from './middleware/security'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
    sagaMiddleware,
    Guard
]

export const getStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(...middleware)
    )
    initSagas(sagaMiddleware)
    return store
}