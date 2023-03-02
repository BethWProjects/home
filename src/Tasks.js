import React, { useState, useEffect } from "react";
import uuid from 'uuid/v4'; //imported after installing npm i uuid@3.3.2 --save to create unique id's for mapped and created properties

function Tasks() {
    //create a key for the first argument to localStorage object in storeTasks helper method
    const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

    //create a storeTasks helper method for local storage that takes in two arguments (global key, hooks we want stored)
    const storeTasks = (taskMap) => { //we will pass in the hook params when calling the method below
        localStorage.setItem(
            TASKS_STORAGE_KEY, //global key is the first argument to the localStorage object
            JSON.stringify(taskMap)  //data what we want to store, this needs to be converted to a string 
        )
    }

    //create helper method that reads the stored data, write a conditional to return an empty array if no items are stored to avoid an error
    const readStoredTasks = () => {
        const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) //parse the stringified data back into an object, so we can have the original object
        return tasksMap ? tasksMap : { tasks: [], completedTasks: [] }  //if tasksMap has an item return this object, otherwise return and empty array for the keys pro
    }

    //create three pieces of state.  We separate them so updates are only applied to the state you want to update, and this is more condusive to refactoring. 
    const [taskText, setTaskText] = useState('')
    const storedTasks = readStoredTasks()  //trick is to use this before we apply the initial values for the tasks and completedTasks useStates...create a variable we can use as a parameter in the hooks we want stored data in (tasks and completedTasks)
    const [tasks, setTasks] = useState(storedTasks.tasks) //change from an empty array to the value of storedTasks
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks)

    useEffect(() => {
        storeTasks({ tasks, completedTasks}) //arguments passed in for taskMap param
    })

    const updateTaskText = event => {
        setTaskText(event.target.value)
    }

    const addTask = () => {
        //using the spread operator, you can add the tasks to the current tasks one by one, and then add the taskText as the final value in the hardcoded array. 
        setTasks([...tasks, { taskText, id: uuid()} ]) //the taskText now has a unique id created using the uuid function imported, so include this in an object and add the id key with the value of uuid()
    }

    // console.log('tasks', tasks)

    const completeTask = (completedT) => () => { //have completeTask return a function reference itself.  using a double arrow syntax will turn this into a complete function on the completeTask function when calling completedTask.  this avoids an infinite loop
        setCompletedTasks([...completedTasks, completedT]) //add completeTask to the completedTasks array
        setTasks(tasks.filter(task => task.id !== completedT.id))  //filter over all tasks to remove the completed task by removing the task.id that does not match the completeTask.id, to remove the task.  this will only include tasks that don't match completed tasks
    }

    // console.log('completed tasks', completedTasks)

    const deleteTask = (task) => () => { //using a double arrow syntax function to avoid an infinite loop, because we are calling this immediately. (NOTE: this is the same as adding a callback function in the JSX below, before the function)
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
                    const { id, taskText } = task  //destructure the task to now included the id as the key and the taskText as the displayed value
                    return (
                         <div key={id} onClick={completeTask(task)}>
                            {taskText}
                            </div>
                    )
                })
            }
        </div>
        <div className="completed-list"> 
            <p className="completed-list-title">Completed List</p>
            {
                completedTasks.map(task => {
                    const { id, taskText } = task
                    return (
                        <div key={id}>
                            {taskText}
                            <span onClick={deleteTask(task)} className="delete-task"> X</span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Tasks;
