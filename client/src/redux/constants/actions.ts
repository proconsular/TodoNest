
export enum Actions {
    SUBMIT_SIGNUP,

    SUBMIT_SIGNIN,
    SIGNIN_SUCCEEDED,
    SIGNIN_FAILED,

    SUBMIT_SIGNOUT,
    SIGNOUT_SUCCEEDED,

    LOAD_SESSION,

    GET_TODOS,
    TODO_FAILED,
    CREATE_TODO,
    UPDATE_TODO,
    DELETE_TODO,
}

export const sendAction = (type: Actions, payload: any) => ({
    type: type.toString(),
    payload,
})

export const sendStore = (type: Actions, payload: any = {}) => ({
    type,
    payload
})

export const sendSecuredAction = (type: Actions, payload: any) => ({
    type: type.toString(),
    payload,
    secure: true,
})