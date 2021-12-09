import React from 'react'
import Totals from './components/totals'
import Content from './components/content'
import Header from './components/header'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Totals course={course} />
    </div>
  )
}

export default App
