import {NEW_DATA_USERS, GET_USERS} from './types'

const initialState = {
    users: []
}

export function usersReducer(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case NEW_DATA_USERS:
            return {
                ...state,
                users: action.payload,
            }
        default: return state
    }
}