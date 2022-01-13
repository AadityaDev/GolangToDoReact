export const NODE_ENV = process.env.NODE_ENV || 'development'
export const __DEV__ = NODE_ENV === 'development'

export const __COMPOSE__ = process.env.REACT_APP_IS_COMPOSE || false