import React from 'react'
import StartImport from '../components/StartImport';
import Todo from '../components/Todo';
import { useTodo } from '../contexts/TodoContext';


export default function Important() {


  const { todos } = useTodo()

  let importants = todos.filter((todos) => todos.important === true)

  return (
    <div className='important-main'>
      {
        importants.length !== 0 ? todos.map(todo => {
          return !todo.complete && todo.important ?
            <Todo todo={todo} /> :
            <span></span>
        }) :
          <StartImport />
      }
    </div>
  )
}
