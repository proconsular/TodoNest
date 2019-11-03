import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

export const ProviderWrapper = ({ store, children=[] }: { store: any, children: JSX.Element | JSX.Element[] }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )
}