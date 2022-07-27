export default function Card({task, onClose,onDone, onDelete}) {
  return (
    <div className='card'>
        <button className="btn close" onClick={onClose}>X</button>
        <h1>{task.toDo}</h1>
        <p>{task.desc}</p>
        <div>
            <button className="btn" onClick={(e)=>onDone(task.id)}>Done</button>
            <button className="btn" onClick={(e)=>onDelete(task.id)}>Delete</button>
        </div>
    </div>
  )
}
