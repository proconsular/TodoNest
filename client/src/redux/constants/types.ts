
export type Children = JSX.Element | JSX.Element[]

export interface Session {
    id: number,
    username: string,
    token: string,
    online: boolean,
}

export interface Todo {
    id: number,
    name: string,
    complete: boolean,
    userId: number,
}