import jwt_decode from "jwt-decode";
import {$authHost, $host} from "./index";
import { USER_ROLES } from '../utils/consts'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: USER_ROLES.USER })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logout = async () => {
    localStorage.removeItem('token')
}
