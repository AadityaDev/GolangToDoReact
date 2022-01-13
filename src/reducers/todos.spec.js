import todos from './todos'
import * as types from '../constants/ActionTypes'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).toEqual([
      {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        Description: 'Run the tests',
        Completed: false,
        Id: 0
      }
    ])

    expect(
      todos([
        {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        Description: 'Run the tests',
        Completed: false,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])

    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: false,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Fix the tests'
      })
    ).toEqual([
      {
        Description: 'Fix the tests',
        Completed: false,
        Id: 2
      }, {
        Description: 'Run the tests',
        Completed: false,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle DELETE_TODO', () => {
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: false,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.DELETE_TODO,
        id: 1
      })
    ).toEqual([
      {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle EDIT_TODO', () => {
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: false,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.EDIT_TODO,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([
      {
        Description: 'Fix the tests',
        Completed: false,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle COMPLETE_TODO', () => {
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: false,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.COMPLETE_TODO,
        id: 1
      })
    ).toEqual([
      {
        Description: 'Run the tests',
        Completed: true,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle COMPLETE_ALL', () => {
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: true,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        Description: 'Run the tests',
        Completed: true,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: true,
        Id: 0
      }
    ])

    // Unmark if all todos are currently Completed
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: true,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: true,
          Id: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        Description: 'Run the tests',
        Completed: false,
        Id: 1
      }, {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos([
        {
          Description: 'Run the tests',
          Completed: true,
          Id: 1
        }, {
          Description: 'Use Redux',
          Completed: false,
          Id: 0
        }
      ], {
        type: types.CLEAR_COMPLETED
      })
    ).toEqual([
      {
        Description: 'Use Redux',
        Completed: false,
        Id: 0
      }
    ])
  })

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: types.COMPLETE_TODO,
          id: 0
        }, {
          type: types.CLEAR_COMPLETED
        }, {
          type: types.ADD_TODO,
          text: 'Write more tests'
        }
      ].reduce(todos, [
        {
          Id: 0,
          Completed: false,
          Description: 'Use Redux'
        }, {
          Id: 1,
          Completed: false,
          Description: 'Write tests'
        }
      ])
    ).toEqual([
      {
        Description: 'Write more tests',
        Completed: false,
        Id: 2
      }, {
        Description: 'Write tests',
        Completed: false,
        Id: 1
      }
    ])
  })
})
