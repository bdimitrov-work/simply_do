import TaskDone from "./TaskDone";

export default function TasksDone({all, onDelete, onOpen}) {
  return (
    <div className="tasks-done">
        {
          all.map((t) => (<TaskDone key={t.id} p={t} onDelete={onDelete} onOpen={onOpen}/>))
        }
    </div>
  )
}
