import { useState, useEffect, useReducer } from "react";
import Header from "./Header";
import Tasks from "./Tasks";
import Add from "./Add";
import TasksDone from "./TasksDone";
import Card from "./Card";
import CardDone from "./CardDone";


export const ACTIONS = {
  ADD_ALL: "add-all",
  ADD_TASK: "add-task",
  DELETE_TASK: "delete-task",
  DONE_TASK: "done-task",
  OPEN_TASK: "open-task",
  CLOSE_TASK: "close-task",
  TOGGLE_ADD: "toggle-add"
}

const Reducer = (state, {type, payload}) => {
  switch(type) {
    case ACTIONS.ADD_ALL:
      return {
        ...state,
        todos: payload.filter((task) => task.done === false),
        dones: payload.filter((task) => task.done === true)
      }
    case ACTIONS.ADD_TASK:
      return {...state, todos: [...state.todos, payload]}
    case ACTIONS.DELETE_TASK:
      return {
        ...state, 
        todos: state.todos.filter((task) => task.id !== payload),
        dones: state.dones.filter((task) => task.id !== payload),
        open: false,
        detail: {}
      }
    case ACTIONS.DONE_TASK:
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== payload.id),
        dones: [...state.dones, payload.data],
        open: false,
        detail: {}
      }
    case ACTIONS.OPEN_TASK:
      return {
        ...state,
        open: true,
        detail: payload
      }
    case ACTIONS.CLOSE_TASK:
      return {
        ...state,
        open: false,
        detail: {}
      }
    case ACTIONS.TOGGLE_ADD:
      return {...state, show: !state.show}

  }
}

const fetchData = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data
}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

function App() {
  const [state, dispatch] = useReducer(Reducer, {todos: [], dones: [], open: false, detail:{}, show: false})

  useEffect(() => {
    const getData = async () => {
      const dataFromServer = await fetchData()
      dispatch({type: ACTIONS.ADD_ALL, payload: dataFromServer})
    }
    getData()
  }, [])

  const onAdd = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/JSON' 
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    dispatch({type: ACTIONS.ADD_TASK, payload: data})
  }

  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    dispatch({type: ACTIONS.DELETE_TASK, payload: id})
  }

  const onDone = async (id) => {
    const taskDone = await fetchTask(id)
    const update = {...taskDone, done: true}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify(update)
    })
    const data = await res.json()
    dispatch({type: ACTIONS.DONE_TASK, payload: {id, data}})
  }

  const onOpen = async (id) => {
    const task = await fetchTask(id)
    dispatch({type: ACTIONS.OPEN_TASK, payload: task})
  }

  const onClose = () => {
    dispatch({type: ACTIONS.CLOSE_TASK})
  }

  return (
    <div className="App">
      <Header dispatch={dispatch}/>
      {state.show && <Add onAdd={onAdd}/>}
      <h1 className="todo">To Do</h1>
      <h1 className="done">Done</h1>
      <Tasks all={state.todos} onDone={onDone} onOpen={onOpen}/>
      <h1 className="done mobile">Done</h1>
      <TasksDone all={state.dones} onDelete={onDelete} onOpen={onOpen}/>
      {(state.open && !state.detail.done) && <Card task={state.detail} onClose={onClose} onDone={onDone} onDelete={onDelete}/>}
      {(state.open && state.detail.done) && <CardDone task={state.detail} onClose={onClose} onDelete={onDelete}/>}
    </div>
  );
}

export default App;
