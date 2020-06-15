import axios from 'axios'
const baseUrl = process.env.REACT_APP_SERVER

export const register = user => axios.post(`${baseUrl}/api/auth/register`, user)
export const login = user => axios.post(`${baseUrl}/api/auth/login`, user)
export const externalLogin = user => axios.post(`${baseUrl}/api/auth/external-login`, user)
export const forgetPassword = email => axios.post(`${baseUrl}/api/auth/forgot-password`, {email})
export const getProfile = token => axios.get(`${baseUrl}/api/manage/profile`, {headers: {Authorization: token}})