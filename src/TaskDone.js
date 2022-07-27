export default function Task({p, onDelete, onOpen}) {
  return (
    <div className="task task-done" onClick={(e)=>{if(e.target.tagName != "BUTTON") onOpen(p.id)}}>
        <h2>{p.toDo}</h2>
        <button className="btn" onClick={(e)=>onDelete(p.id)}>Delete</button>
    </div>
  )
}
