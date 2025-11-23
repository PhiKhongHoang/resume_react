import { useState } from "react"
import TodoData from "./TodoData"
import TodoNew from "./TodoNew"
import reactLogo from '../../assets/react.svg'


const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React" },
        // { id: 2, name: "Watching YT" }
    ])

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 100000),
            name: name
        }

        setTodoList([...todoList, newTodo])
    }

    const deleteTodo = (id) => {
        const newTodo = todoList.filter(item => item.id !== id)

        setTodoList(newTodo)
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoNew
                addNewTodo={addNewTodo}
            />

            {todoList.length === 0
                ?
                <div className='todo-image'>
                    <img src={reactLogo} alt="logo" className='logo' />
                </div>
                :
                <TodoData
                    todoList={todoList}
                    deleteTodo={deleteTodo}
                />
            }
        </div>
    )
}

export default TodoApp