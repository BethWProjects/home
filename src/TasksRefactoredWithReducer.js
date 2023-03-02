import React, { useState, useEffect, useReducer } from "react";
import uuid from 'uuid/v4'; 

//set up initial state object for tasks and completedTasks
const initialTasksState = {
    tasks: [], 
    completedTasks: []
};

//establish a TYPES object to represent the actions flowing to the reducer
//idea is each action object is going to include a relevent type
const TYPES = {
    ADD_TASK: 'ADD_TASK', 
    COMPLETE_TASK: 'COMPLETE_TASK', 
    DELETE_TASK: 'DELETE_TASK'
}

//this reducer will contain state and logic for tasks AND completedTasks arrays
//return a new object with the existing state using the spread operator, and overide the tasks with a new array
const tasksReducer = (state, action) => {
    console.log('state', state, 'action', action)

    switch(action.type) {
        case TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            };
        case TYPES.COMPLETE_TASK:
            const { completedTask } = action;
            return {
                ...state,
                completedTasks: [...state.completedTasks, completedTask],
                tasks: state.tasks.filter(t => t.id !== completedTask.id)
            }
        case TYPES.DELETE_TASK: 
            return {
                ...state,
                completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
            }
        default: 
            return state;
    }
}

function TasksRefactoredWithReducer() {
    const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

    const storeTasks = (taskMap) => { 
        localStorage.setItem(
            TASKS_STORAGE_KEY, 
            JSON.stringify(taskMap)  
        )
    }

    const readStoredTasks = () => {
        const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) 
        return tasksMap ? tasksMap : initialTasksState 
    }

    const [taskText, setTaskText] = useState('')
    const storedTasks = readStoredTasks()  
   

    const [ state, dispatch ] = useReducer(tasksReducer, storedTasks); //param 1: reducer that returns the initial state value, param 2: we need the second argument to call the initial state to the useReducer hook, or it will be undefined.  NOTE: The React engine won't trigger the reducer until you call the 'dispatch' method.  
    // console.log('state', state)

    const { tasks, completedTasks } = state; 

    useEffect(() => {
        storeTasks({ tasks, completedTasks}) 
    })

    const updateTaskText = event => {
        setTaskText(event.target.value)
    }

    const addTask = () => {
        dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid()}}); //this will now trigger the reducer by calling the dispatch method 
    }

    const completeTask = (completedTask) => () => { 
        dispatch({ type: TYPES.COMPLETE_TASK, completedTask}) 
    }

    // console.log('completed tasks', completedTasks)

    const deleteTask = (task) => () => { 
        dispatch({ type: TYPES.DELETE_TASK, task})
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

  return (
    <div>
        <h3>Tasks Refactored with Reducer</h3>
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
                    const { id, taskText } = task  
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

export default TasksRefactoredWithReducer;
