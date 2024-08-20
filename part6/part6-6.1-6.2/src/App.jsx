
import { useDispatch, useSelector } from 'react-redux'
import { giveGood, giveOk, giveBad, makeZero } from './reducer'

const App = () => {
    
    const dispatch = useDispatch()
    const votes = useSelector(votes => votes)

    return (
      <div>
        <button onClick={dispatch(giveGood())}>good</button> 
        <button onClick={dispatch(giveOk())}>ok</button> 
        <button onClick={dispatch(giveBad())}>bad</button>
        <button onClick={dispatch(makeZero())}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    )
  }

export default App