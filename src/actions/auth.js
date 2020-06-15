import * as api from '../api/auth'
import * as types from '../constants/auth'
import { toast  } from 'react-toastify';
import history from '../history'

export const register = user => {
    return async dispatch => {
        try{
            dispatch({
                type: types.REGISTER_REQUEST
            })
            const response = await api.register(user)
            if(response.status === 200)
            {
                dispatch({
                    type: types.REGISTER_SUCCESS
                })
                toast.success('Registered successfully')
                history.push('/pages/login')         
            }
        }
        catch(e)
        {
            let message = "Network Error"
            if(e.response)
            {
                if(e.response && e.response.status === 400)
                {
                    message = e.response.data
                    if(e.response.data.title)
                    {
                        message = e.response.data.title
                    }
                }
            }
            dispatch({
                type: types.REGISTER_FAILED,
                payload: message
            })
        }
    }
}

export const login = user => {
    return async dispatch => {
        try{
            dispatch({
                type: types.LOGIN_REQUEST
            })
            const response = await api.login(user)
            if(response.status === 200)
            {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: response.data
                })         
            }
            history.push('/')
        }
        catch(e)
        {
            let message = "Network Error"
            if(e.response && e.response.status === 404 )
            {
                message = e.response.data
            }
            dispatch({
                type: types.LOGIN_FAILED,
                payload: message
            })
        }
    }
}
export const reset = () => {
    return async dispatch => {
        dispatch({
            type: types.RESET
        })
    }
}

export const socialLogin = user => {
    return async dispatch => {
        try{
            dispatch({
                type: types.LOGIN_REQUEST
            })
            const response = await api.externalLogin(user)
            // if(response.status === 200)
            // {
            //     dispatch({
            //         type: types.LOGIN_SUCCESS,
            //         payload: response.data
            //     })         
            // }
            // history.push('/')
        }
        catch(e)
        {
            console.log(e.response)
            // let message = "Network Error"
            // if(e.response && e.response.status === 404 )
            // {
            //     message = e.response.data
            // }
            // dispatch({
            //     type: types.LOGIN_FAILED,
            //     payload: message
            // })
        }
    }
}

export const forgetPassword = email => {
    return async dispatch => {
        try{
            dispatch({
                type: types.FORGET_PASSWORD_REQUEST
            })
            const response = await api.forgetPassword(email)
            if(response.status === 200)
            {
                dispatch({
                    type: types.FORGET_PASSWORD_COMPLETE,
                    payload: 'Check Your Email !!!',
                    error: false
                })         
            }
        }
        catch(e)
        {
            let message = "Network Error"
            if(e.response && e.response.status === 400 )
            {
                message = e.response.data
            }
            dispatch({
                type: types.FORGET_PASSWORD_COMPLETE,
                payload: message,
                error: true
            })
        }
    }
}

export const getProfile = email => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: types.PROFILE_LOADING
            })
            const state = getState()
            const {token} = state.auth
            console.log('func')
            const response = await api.getProfile(token)
            console.log('response i s', response)
            // if(response.status === 200)
            // {
            //     dispatch({
            //         type: types.FORGET_PASSWORD_COMPLETE,
            //         payload: 'Check Your Email !!!',
            //         error: false
            //     })         
            // }
        }
        catch(e)
        {
            // let message = "Network Error"
            // if(e.response && e.response.status === 400 )
            // {
            //     message = e.response.data
            // }
            // dispatch({
            //     type: types.FORGET_PASSWORD_COMPLETE,
            //     payload: message,
            //     error: true
            // })
        }
    }
}