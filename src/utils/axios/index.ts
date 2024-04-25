import axios from 'axios'

const token = sessionStorage.getItem('token')

export const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: {},
})

export const instanceAuth = axios.create({
    baseURL:  'http://localhost:8000',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        Authorization: `Bearer ${token}`,
    },
})