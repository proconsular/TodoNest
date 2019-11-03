import React, { useState, FormEvent } from 'react'
import { mergeStyleSets } from '@uifabric/merge-styles'
import { getFormStyles } from '../styles/forms'
import { connect } from 'react-redux'
import { sendAction, Actions } from '../redux/constants/actions'

const getStyles = () => {
    return mergeStyleSets({

        ...getFormStyles(),
    })
}

const SigninForm = ({ submit } : { submit: Function }) => {
    const [styles] = useState(getStyles())

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (username.length > 0 && password.length > 0) {
            submit(username, password)
            setPassword('')
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}> 
            <input type='text' value={username} placeholder={'Username'} onChange={e => setUsername(e.target.value)} />
            <input type='password' value={password} placeholder={'Password'} onChange={e => setPassword(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    )
}

const SigninController = ({ submit } : { submit: Function }) => {

    return <SigninForm submit={submit} />
}

const mts = (state: any) => ({

})

const mtd = (dispatch: Function) => ({
    submit: (username: string, password: string) => dispatch(sendAction(Actions.SUBMIT_SIGNIN, {username, password}))
})

const container = (props: any) => (
    <SigninController {...props} />
)

export default connect<any, any>(mts, mtd)(container)