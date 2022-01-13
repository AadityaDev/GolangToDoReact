import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  // componentDidMount() {
  //   this.props.actions.getTodos()
  // }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text, this.props.todos.length)
      window.location.reload();
    }
  }

  render() {
    const { todos, actions } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}
