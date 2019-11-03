
export const Guard = (store: any) => (next: any) => (action: any) => {
    if (action.secure) {
        const session = store.getState().session
        if (session.online && session.token) {
            action.token = session.token
        }
    }
    next(action)
}