import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const addGood = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const addBad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const addOk = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  const { good, ok, bad } = store.getState()

  return (
    <div>
      <button onClick={addGood}>good</button>
      <button onClick={addOk}>ok</button>
      <button onClick={addBad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
