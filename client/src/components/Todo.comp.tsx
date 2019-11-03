import React, { useState } from 'react'

import { connect } from 'react-redux'
import { sendSecuredAction, Actions } from '../redux/constants/actions'
import { mergeStyleSets } from '@uifabric/merge-styles'

import classnames from 'classnames'

const getStyles = () => {
    return mergeStyleSets({
        main: {
            // background: '#999 !important',
            // border: '1px solid #eee',
            borderBottom: '2px solid #eee3',
            color: '#eee',
            marginTop: 8,
            padding: 12,
            paddingBottom: 8,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 4,
            marginRight: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            textTransform: 'uppercase',
        },
        done: {
            cursor: 'pointer',
            padding: 4,
            selectors: {
                ':hover': {
                    background: '#eee',
                    color: '#333',
                }
            }
        },
        green: {
            background: '#1e1 !important',
            color: '#333',
        },
        options: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            selectors: {
                'div:last-child': {
                    marginLeft: 12,
                }
            }
        },
        remove: {
            cursor: 'pointer',
            padding: 4,
            selectors: {
                ':hover': {
                    background: '#e11',
                    color: '#333',
                }
            }
        }
    })
}

const Todo = ({ name, complete, update, remove } : { name: string, complete: boolean, update: Function, remove: Function }) => {
    const [styles] = useState(getStyles())

    return (
        <div className={styles.main}>
            <div>{name}</div>
            <div className={styles.options}>
                <div className={classnames(styles.done, {[styles.green]: complete})} onClick={() => update(name, !complete)}>{complete ? 'Done' : 'Not Done'}</div>
                <div className={styles.remove} onClick={() => remove()}>X</div>
            </div>
        </div>
    )
}

const Controller = ({ id, name, complete, update, remove } : { id: number, name: string, complete: boolean, update: Function, remove: Function }) => {
    return <Todo name={name} complete={complete} update={(name: string, complete: boolean) => update(id, name, complete)} remove={() => remove(id)} />
}

const mts = (state: any) => ({

})

const mtd = (dispatch: Function) => ({
    update: (id: number, name: string, complete: boolean) => dispatch(sendSecuredAction(Actions.UPDATE_TODO, {id, name, complete})),
    remove: (id: number) => dispatch(sendSecuredAction(Actions.DELETE_TODO, {id}))
})

const container = (props: any) => (
    <Controller {...props} />
)

export default connect<any, any>(mts, mtd)(container)