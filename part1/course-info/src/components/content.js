import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
  const { parts } = course
  return (
    <div>
      {parts.map((part) => {
        const { name, exercises } = part
        return <Part name={name} excercises={exercises} />
      })}
    </div>
  )
}

export default Content
