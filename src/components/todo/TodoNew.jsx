import { useState } from "react"

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("BTD 🤣")
    const { addNewTodo } = props

    // addNewTodo("btd")

    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")
    }

    const handleChange = (name) => {
        setValueInput(name)
    }

    return (
        <div className='todo-new'>
            <input
                type="text"
                onChange={(event) => { handleChange(event.target.value) }}
                value={valueInput}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            <div>
                My text input is = {valueInput}
            </div>
        </div>
    )
}

export default TodoNew