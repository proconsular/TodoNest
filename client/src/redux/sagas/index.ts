import * as Admission from './admission'
import * as Todos from './todos'

export const initSagas = (sagaMiddleware: any) => {
    let sagas: any[] = [
        ...Object.values(Admission),
        ...Object.values(Todos),
    ]
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware))
}