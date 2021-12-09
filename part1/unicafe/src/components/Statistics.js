import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, bad, neutral }) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + bad + neutral} />
          <StatisticLine
            text='average'
            value={(good - bad) / (good + bad + neutral)}
          />
          <StatisticLine
            text='positive'
            value={(good * 100) / (good + bad + neutral)}
          />
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
