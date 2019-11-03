import { takeLatest, put } from 'redux-saga/effects'
import { Actions, sendStore } from '../constants/actions'
import { Request, Methods } from '../utils/request'

interface Action {
    type: string,
    payload: any
}

export function* submitSignup() {
    yield takeLatest(Actions.SUBMIT_SIGNUP.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.post, '/api/admission')
            let response = yield request.send(action.payload)
            if (!response.ok) {
                throw new Error(`Signup failure. ${yield response.text()}`)
            }
            
        } catch(err) {
            console.log(err)
        }
    })
}

export function* submitSignin() {
    yield takeLatest(Actions.SUBMIT_SIGNIN.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.put, '/api/admission')
            let response = yield request.send(action.payload)
            let data = yield response.json()
            if (!response.ok) {
                throw new Error(`Signin failure. ${data}`)
            }
            yield put(sendStore(Actions.SIGNIN_SUCCEEDED, data))
        } catch(err) {
            console.log(err)
        }
    })
}

export function* submitSignout() {
    yield takeLatest(Actions.SUBMIT_SIGNOUT.toString(), function* (action: any) {
        try {
            let request = new Request(Methods.delete, `/api/admission/${action.payload.id}`)
            request.setToken(action.token)
            let response = yield request.send()
            if (!response.ok) {
                throw new Error(`Signout failure. ${yield response.text()}`)
            }
            yield put(sendStore(Actions.SIGNOUT_SUCCEEDED))
        } catch(err) {
            console.log(err)
        }
    })
}