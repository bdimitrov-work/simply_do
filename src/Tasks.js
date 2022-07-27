import Task from "./Task";

export default function Tasks({all, onDone, onOpen}) {
  return (
    <div className="tasks">
        {
          all.map((t) => (<Task key={t.id} p={t} onDone={onDone} onOpen={onOpen}/>))
        }
    </div>
  )
}
