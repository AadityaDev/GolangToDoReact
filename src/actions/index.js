import * as types from '../constants/ActionTypes'
import superagent from 'superagent'
import { API_ROOT } from '../constants/host'

// export const addTodo = text => ({ type: types.ADD_TODO, text })
export const addTodo = text => {
  return dispatch => {
    return superagent
      .post(`${API_ROOT}/createTodo`)
      .send({ text: text, completed: false })
      .end((err, res) => {
        dispatch({ type: types.ADD_TODO, id: res.body.data.id, text: text, completed: false })
      })
  }
}

// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const deleteTodo = id => {
  return dispatch => {
    return superagent
      .delete(`${API_ROOT}/updateTodo/${id}`)
      .end((err, res) => dispatch({ type: types.DELETE_TODO, id }))
  }
}

// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const editTodo = (id, text) => {
  return dispatch => {
    return superagent
      .patch(`${API_ROOT}/updateTodo/${id}`)
      .send({ text: text })
      .end((err, res) => dispatch({ type: types.EDIT_TODO, id: id, text: text }))
  }
}

// Before click just toggled the state, now we need to pass correct state to back end
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeTodo = (id, state) => {
  return dispatch => {
    return superagent
      .patch(`${API_ROOT}/updateTodo/${id}`)
      .send({ completed: state })
      .end((err, res) => dispatch({ type: types.COMPLETE_TODO, id: id, completed: state }))
  }
}

// New get function
export const getTodos = () => {
  return dispatch => {
    return superagent
      .get(`${API_ROOT}/getTodo`)
      .end((err, res) => {
        if (err)
          dispatch({ type: types.GET_TODOS, data: [] })
        else
          console.log(`res is: ${res}`);
          console.log(`res.body is: ${res.body}`);
          // console.log(`res.body is: ${res.body?.data}`);
          dispatch({ type: types.GET_TODOS, data: res.body })
      })
  }
}

// As BE is extremely general REST API we need to collect id's in the Front and do multiple updates

// export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const completeAll = items => {
  return dispatch => {
    var promises = items.map(item => {
      return new Promise((resolve, reject) => {
        superagent
          .patch(`${API_ROOT}/updateTodo/${item.id}`)
          .send({ completed: item.completed })
          .end((err, res) => resolve())
      })
    })
    Promise.all(promises).then(results => dispatch(({ type: types.COMPLETE_ALL })))
  }
}

// export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const clearCompleted = ids => {
  return dispatch => {
    var promises = ids.map(id => {
      return new Promise((resolve, reject) => {
        superagent
          .delete(`${API_ROOT}/updateTodo/${id}`)
          .end((err, res) => resolve())
      })
    })
    Promise.all(promises).then(results => dispatch(({ type: types.CLEAR_COMPLETED })))
  }
}
