import { setXToken } from '@/http'

export const setHeaderToken = (accessToken) => setXToken(accessToken)
export const getLocalToken = () => localStorage.getItem('accessToken')
export const deleteLocalToken = () => localStorage.removeItem('accessToken')
export const setLocalToken = accessToken => localStorage.setItem('accessToken', accessToken)