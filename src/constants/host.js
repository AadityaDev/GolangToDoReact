import { __DEV__, __COMPOSE__ } from '../config'

let PROTOCOL = window.location.protocol

let API_HOST = global.window
    ? `${PROTOCOL}//${window.location.hostname}`
    : `${PROTOCOL}//quic2.site`
let API_PORT = global.window ? window.location.port : '80'
let API_VERSION = '/api/v1'
let API_SERVICE_ENDPOINT = '/todo'

if (__DEV__ || __COMPOSE__) {
    API_HOST = process.env.REACT_APP_API_HOST
    API_PORT = process.env.REACT_APP_API_PORT
    API_VERSION = ''
    API_SERVICE_ENDPOINT = ''
}

export const API_ROOT = `${API_HOST}:${API_PORT}${API_VERSION}${API_SERVICE_ENDPOINT}`