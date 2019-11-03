import React, { useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { sendAction, Actions } from '../redux/constants/actions'
import { mergeStyleSets } from '@uifabric/merge-styles'
import { getFormStyles } from '../styles/forms'

const getStyles = () => {
    return mergeStyleSets({
        
        ...getFormStyles(),
    })
}

interface SubmitFunc {
    (username: string, password: string): void
}

const SignupForm = ({ submit } : { submit: SubmitFunc }) => {
    const [styles] = useState(getStyles())

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (username.length > 3 && password === confirmPassword) {
            submit(username, password)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input type='text' value={username} placeholder={'Username'} onChange={e => setUsername(e.target.value)} />
            <input type='password' value={password} placeholder={'Password'} onChange={e => setPassword(e.target.value)} />
            <input type='password' value={confirmPassword} placeholder={'Retype password'} onChange={e => setConfirmPassword(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    )
}

const SignupFormController = ({ submit }: { submit: SubmitFunc }) => {
    return <SignupForm submit={submit} />
}

const mts = (state: any) => ({

})

const mtd = (dispatch: Function) => ({
    submit: (username: string, password: string) => dispatch(sendAction(Actions.SUBMIT_SIGNUP, {username, password}))
})

const container = (props: any) => (
    <SignupFormController {...props} />
)

export default connect<any, any>(mts, mtd)(container)