import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.Completed,
  [SHOW_COMPLETED]: todo => todo.Completed
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = { filter: SHOW_ALL }

  // Add componentDidMount to load initial state and to update state when message is received from WebSocket
  componentDidMount() {
    this.props.actions.getTodos()
  }

  // handleClearCompleted = () => {
  handleClearCompleted = (ids) => {
    // this.props.actions.clearCompleted()
    this.props.actions.clearCompleted(ids)
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
            onChange={() => {
              const NonCompleted = todos.filter(e => !e.Completed).map(e => e.Id)
              if (NonCompleted.length > 0) {
                actions.completeAll(NonCompleted.map(e => ({ id: e, Completed: true })))
              } else {
                actions.completeAll(todos.map(e => ({ id: e.Id, Completed: !e.Completed })))
              }

            }} />
          <label
            htmlFor="toggle-all"
          />
        </section>
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          //onClearCompleted={this.handleClearCompleted}                
          onClearCompleted={() => this.handleClearCompleted(todos.filter(e => e.Completed).map(e => e.Id))}
          onShow={this.handleShow} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.Completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.Id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
