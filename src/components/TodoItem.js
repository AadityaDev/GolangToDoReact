import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.Description}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.Id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.Completed}
                 // onChange={() => completeTodo(todo.Id)} />
                 onChange={() => completeTodo(todo.Id, !todo.Completed)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.Description}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.Id)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.Completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
