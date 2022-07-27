export default function Task({p, onDone, onOpen}) {
  return (
    <div className="task" onClick={(e)=>{if(e.target.tagName != "BUTTON") onOpen(p.id)}}>
        <h2>{p.toDo}</h2>
        <button className="btn" onClick={(e)=>onDone(p.id)}>Done</button>
    </div>
  )
}
