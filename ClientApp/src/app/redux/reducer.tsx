export interface IUserInfo {
    uid: string,
    pwd: string,
    token: string
}

const initialState = {
    uid: "",
    pwd: "",
    token: ""
}

function reducer(state: IUserInfo = initialState, action: { type: string; value: any }) {
    switch (action.type) {
        case 'SET_UID':
            return { ...state, uid: action.value }
        case 'SET_PWD':
            return { ...state, pwd: action.value }
        case 'SET_TOKEN':
            return { ...state, token: action.value }
        default:
            return state
    }
}

export default reducer;