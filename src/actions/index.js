import * as types from '../constants/ActionTypes'
import superagent from 'superagent'
import { API_ROOT } from '../constants/host'

// export const addTodo = text => ({ type: types.ADD_TODO, text })
export const addTodo = (Description, Id) => {
  return dispatch => {
    return superagent
      .post(`${API_ROOT}/createTodo`)
      .send(JSON.stringify({ Description: Description, Completed: false }))
      .end((err, res) => {
        dispatch({ type: types.ADD_TODO, Id: Id, Description: Description, Completed: false })
      })
  }
}

// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const deleteTodo = id => {
  return dispatch => {
    return superagent
      .put(`${API_ROOT}/updateTodo?id=${id}`)
      .send(JSON.stringify({ Completed: true }))
      .end((err, res) => dispatch({ type: types.DELETE_TODO, id }))
  }
}

// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const editTodo = (id, text) => {
  return dispatch => {
    return superagent
      .put(`${API_ROOT}/updateTodo?id=${id}`)
      .send(JSON.stringify({ Description: text }))
      .end((err, res) => dispatch({ type: types.EDIT_TODO, Id: id, Description: text }))
  }
}

// Before click just toggled the state, now we need to pass correct state to back end
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeTodo = (id, state) => {
  return dispatch => {
    return superagent
      .put(`${API_ROOT}/updateTodo?id=${id}`)
      .send(JSON.stringify({ Completed: state }))
      .end((err, res) => dispatch({ type: types.COMPLETE_TODO, Id: id, Completed: state }))
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
          .put(`${API_ROOT}/updateTodo?id=${item.id}`)
          .send(JSON.stringify({ Completed: item.Completed }))
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
          .put(`${API_ROOT}/updateTodo?id=${id}`)
          .send(JSON.stringify({ Completed: true }))
          .end((err, res) => resolve())
      })
    })
    Promise.all(promises).then(results => dispatch(({ type: types.CLEAR_COMPLETED })))
  }
}
