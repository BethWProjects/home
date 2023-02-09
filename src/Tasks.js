import React, { useState } from "react";
import uuid from 'uuid/v4'; //imported after installing npm i uuid@3.3.2 --save to create unique id's for mapped and created properties

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
        setTasks([...tasks, { taskText, id: uuid()} ]) //the taskText now has a unique id created using the uuid function imported, so include this in an object and add the id key with the value of uuid()
    }

    console.log('tasks', tasks)

    const completeTask = (completedTask) => () => { //have completeTask return a function reference itself.  using a double arrow syntax will turn this into a complete function on the completeTask function when calling completedTask.  this avoids an infinite loop
        setCompletedTasks([...completedTasks, completedTask]) //add completeTask to the completedTasks array
        setTasks(tasks.filter(task => task.id !== completedTask.id))  //filter over all tasks to remove the completed task by removing the task.id that does not match the completeTask.id, to remove the task.  this will only include tasks that don't match completed tasks
    }

    console.log('completed tasks', completedTasks)

    const deleteTask = (task) => () => {
        setCompletedTasks(completedTasks.filter(t => t.id !== task.id))
    }

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
                    const {id, taskText } = task  //destructure the task to now included the id as the key and the taskText as the displayed value
                    return (
                         <div key={id} onClick={completeTask(task)}>
                            {taskText}
                            </div>
                    )
                })
            }
        </div>
        <div className="completed-list"> 
            <p>Completed List</p>
            {
                completedTasks.map(task => {
                    const { id, taskText } = task
                    return (
                        <div key={id}>
                            {taskText}
                            <span onClick={deleteTask(task)} className="delete-task">x</span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Tasks;
