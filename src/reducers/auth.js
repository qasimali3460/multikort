import * as types from '../constants/auth'


let initialState = {
    isAuthenticated: false,
    user: {},
    token: null,
    loading: false,
    message: '',
    error: false
}


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
            return {
                ...state,
                message: '',
                loading: true
            }
        case types.REGISTER_FAILED: 
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case types.REGISTER_SUCCESS: 
            return {
                ...state,
                message: '',
                loading: false
            }
        case types.LOGIN_REQUEST:
            return {
                ...state,
                message: '',
                loading: true,
            }
        case types.LOGIN_FAILED: 
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case types.LOGIN_SUCCESS: 
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                message: ''
            }
        case types.FORGET_PASSWORD_REQUEST:
            return {
                ...state,
                message: '',
                loading: true,
                error: false
            }
        case types.FORGET_PASSWORD_COMPLETE: 
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: action.error
            }
        case types.RESET: 
            return {
                ...state,
                message: '',
                loading: false,
                error: true
            }
        default:
            return state;
    }
}
