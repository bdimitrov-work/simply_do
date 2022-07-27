import { useState } from "react";

export default function Add({onAdd}) {
    const [toDo, setText] = useState("");
    const [desc, setDesc] = useState("")

    const save = () => {
      onAdd({toDo, desc, done: false})

      setText("")
      setDesc("")
    }

  return (
    <div className="add">
        <input className="text" type="text" placeholder="Add new task here..." value={toDo} onChange={(e) => setText(e.target.value)}/>
        <input className="desc" type="text" placeholder="Description here..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={save}>Add Task</button>
    </div>
  )
}
