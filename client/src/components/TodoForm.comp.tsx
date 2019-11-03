import React, { useState, FormEvent } from 'react'
import { Session } from '../redux/constants/types'
import { sendSecuredAction, Actions } from '../redux/constants/actions'
import { connect } from 'react-redux'
import { getFormStyles } from '../styles/forms'

const TodoForm = ({ submit } : { submit: Function }) => {
    const [styles] = useState(getFormStyles())

    const [content, setContent] = useState('')

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (content.length > 0) {
            submit(content)
            setContent('')
        }
    }

    return (
        <div>
            <form className={styles.form} onSubmit={onSubmit} >
                <input type='text' value={content} onChange={e => setContent(e.target.value)} />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

const FormController = ({ session, createTodo } : { session: Session, createTodo: Function }) => {
    return <TodoForm submit={(name: string) => createTodo(session.id, name)} />
}

const mts = (state: any) => ({
    session: state.session,
})

const mtd = (dispatch: Function) => ({
    createTodo: (userId: number, name: string) => dispatch(sendSecuredAction(Actions.CREATE_TODO, {userId, name}))
})

const container = (props: any) => (
    <FormController {...props} />
)

export default connect<any, any>(mts, mtd)(container)