import React, { useState } from "react";
import uuid from 'uuid/v4';

function Tasks() {
    //create three pieces of state.  We separate them so updates are only applied to the state you want to update, and this is more condusive to refactoring. 
    const [taskText, setTaskText] = useState('')
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    const updateTaskText = event => {
        setTaskText(event.target.value)
    }

    const addTask = () => {
        //using the spread operator, you can add the tasks to the current tasks one by one, and then add the taskText as the final value in the hardcoded array. 
        setTasks([...tasks, { taskText, id: uuid()} ])
    }

    console.log('tasks', tasks)

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

  return (
    <div>
        <h3>Tasks</h3>
        <div className="form">
            <input  
                value={taskText}
                onChange={updateTaskText}
                onKeyPress={handleKeyPress}
            />
            <button onClick={addTask}>Add Task</button>
        </div>
        <div className="task-list">
            {
                tasks.map(task => {
                    const {id, taskText } = task
                    return <div key={id}>{taskText}</div>
                })
            }
        </div>
    </div>
  )
}

export default Tasks;
