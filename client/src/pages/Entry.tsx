import React, { useState, useEffect } from 'react'

import Frame from '../components/Frame.comp'
import SignupComp from '../components/Signup.comp'
import SigninComp from '../components/Signin.comp'

import { Session, Todo } from '../redux/constants/types'
import { connect } from 'react-redux'
import { mergeStyleSets } from '@uifabric/merge-styles'
import { sendStore, Actions, sendSecuredAction } from '../redux/constants/actions'

import TodoFormComp from '../components/TodoForm.comp'
import TodoComp from '../components/Todo.comp'

const getStyles = () => {
    return mergeStyleSets({
        box: {
            background: '#999',
            width: 300,
            marginTop: 30,
            padding: 12,
            marginLeft: 'auto',
            marginRight: 'auto',        
        },
        button: {
            marginTop: 12,
            marginLeft: 'auto',
            marginRight: 'auto',
            border: 'none',
            padding: 4,
            paddingLeft: 12,
            paddingRight: 12,
            fontSize: 18,
            display: 'block',
        },
        main: {
            width: 500,
            minHeight: '94.5vh',
            background: '#444',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: 24,
            paddingLeft: 12,
            paddingRight: 12,
            selectors: {
                'div': {
                    background: 'none',
                }
            }
        }
    })
}

const EntryPresentor = ({ session, todos } : { session: Session, todos: Todo[] }) => {
    const [styles] = useState(getStyles())
    const [showSignin, setShowSignin] = useState(true)

    if (session.online) {
        return (
            <Frame>
                <div className={styles.main}>
                    <div>
                        <TodoFormComp />
                        <div>
                            {todos && todos.map(todo => {
                                return (
                                    <TodoComp key={todo.id} {...todo} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Frame>
        )
    } else {
        return (
            <Frame>
                <div className={styles.box}>
                    {showSignin ? <SigninComp /> : <SignupComp />}
                    <button className={styles.button} onClick={() => setShowSignin(!showSignin)}>Switch</button>
                </div>
            </Frame>
        )
    }
}

const EntryController = ({ session, loadSession, todos, getTodos } : { session: Session, loadSession: Function, todos: {[id: number]: Todo}, getTodos: Function }) => {
    useEffect(() => {
        loadSession()
    }, [session.id])

    useEffect(() => {
        if (session.online) {
            getTodos(session.id)
        }
    }, [session.online])

    return <EntryPresentor session={session} todos={Object.values(todos)} />
}

const mts = (state: any) => ({
    session: state.session,
    todos: state.todos,
})

const mtd = (dispatch: Function) => ({
    loadSession: () => dispatch(sendStore(Actions.LOAD_SESSION)),
    getTodos: (id: number) => dispatch(sendSecuredAction(Actions.GET_TODOS, {userId: id}))
})

const container = (props: any) => (
    <EntryController {...props} />
)

export default connect<any, any>(mts, mtd)(container)