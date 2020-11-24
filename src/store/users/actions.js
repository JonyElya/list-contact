import {NEW_DATA_USERS, GET_USERS, USERS_ERROR} from './types'
import axios from 'axios'

export const getUsers = () => async dispatch => {
    try{
        if(localStorage.getItem("users") !== null){
            const data = await JSON.parse(localStorage.getItem("users"))
            dispatch({
                type: GET_USERS,
                payload: data
            })
        } else {
            const res = await axios.get(`http://demo.sibers.com/users`)
            dispatch( {
                type: GET_USERS,
                payload: res.data
            })
        }
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }

}

export const editUser = data => async dispatch => {
    try{
        const res = await data
        dispatch( {
            type: NEW_DATA_USERS,
            payload: res
        })
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }
}