import { ACTIONS } from "./App"

export default function Header({dispatch}) {
  return (
    <div className="header">
        <h1>Simply Do</h1>
        <div onClick={() => dispatch({type: ACTIONS.TOGGLE_ADD})}>+</div>
    </div>
  )
}
