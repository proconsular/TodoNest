import React, { useState } from 'react'

import { mergeStyleSets } from '@uifabric/merge-styles'

import { Children, Session } from '../redux/constants/types'
import { connect } from 'react-redux'
import { sendSecuredAction, Actions } from '../redux/constants/actions'

const getStyles = () => {
    return mergeStyleSets({
        bar: {
            background: '#333',
            height: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#eee',
            selectors: {
                'div': {
                    background: 'none',
                    // padding: 4,
                    paddingLeft: 12,
                    paddingRight: 0,
                    margin: 0,
                }
            }
        },
        status: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            selectors: {
                'div': {
                    padding: 0,
                },
                'button': {
                    border: 'none',
                    padding: 4,
                    paddingLeft: 12,
                    paddingRight: 12,
                    background: '#e77',
                    color: '#eee',
                    fontSize: 14,
                    marginLeft: 12,
                }
            }
        }
    })
}

const Frame = ({ session, children, signout }: { session: Session, children: Children, signout: Function }) => {
    const [styles] = useState(getStyles())
    
    return (
        <div>
            <div className={styles.bar}>
                <div>
                    Todo
                </div>
                {session && session.online && (
                    <div className={styles.status}>
                        <div>
                            {session.username}
                        </div>
                        <button onClick={() => signout()}>Signout</button>
                    </div>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

const FrameController = ({ session, children, signout }: { session: Session, children: Children, signout: Function }) => {
    return (
        <Frame session={session} signout={() => signout(session.id)}>
            {children}
        </Frame>
    )
}

const mts = (state: any) => ({
    session: state.session,
})

const mtd = (dispatch: Function) => ({
    signout: (id: number) => dispatch(sendSecuredAction(Actions.SUBMIT_SIGNOUT, {id}))
})

const container = (props: any) => (
    <FrameController {...props} />
)

export default connect<any, any>(mts, mtd)(container)