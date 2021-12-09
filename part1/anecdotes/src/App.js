import { useState, useEffect } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [high, setHigh] = useState(0)

  const random = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    if (randomNumber === selected) {
      randomNumber -= 1

      if (randomNumber < 0) {
        randomNumber += 2
      }
    }

    setSelected(randomNumber)
  }

  // const anecdoteNumber = anecdotes.length - 1

  // const points = Array(anecdoteNumber).fill(0)

  const anecdoteVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  useEffect(() => {
    const copy = [...votes]

    const maxVal = Math.max(...copy)

    const maxValIndex = copy.findIndex((num) => {
      return num === maxVal
    })

    setHigh(maxValIndex)
  }, [votes])

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>
          {anecdotes[selected]} has {votes[selected]} votes
        </p>
        <button onClick={random}>next anecdote</button>
        <button onClick={anecdoteVote}>vote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[high]} has {votes[high]} votes
        </p>
      </div>
    </>
  )
}

export default App
