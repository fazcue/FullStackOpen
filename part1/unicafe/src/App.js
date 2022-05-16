import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  const average = (good - bad) / total
  const positive = `${good > 0 ? good / total * 100 : 0}%`

  return (
      <>
        {total > 0 ?
          <table>
            <thead>
              <tr>
                <th><h2>statistics</h2></th>
              </tr>
            </thead>
            <tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='all' value={total} />
              <StatisticLine text='average' value={average} />
              <StatisticLine text='positive' value={positive} />
            </tbody>
          </table> :
          <p>No feedback fiven</p>
        }
      </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodFeedback = () => {
    setGood(prev => prev + 1)
    setTotal(prev => prev + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(prev => prev + 1)
    setTotal(prev => prev + 1)
  }

  const handleBadFeedback = () => {
    setBad(prev => prev + 1)
    setTotal(prev => prev + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodFeedback} />
      <Button text='neutral' onClick={handleNeutralFeedback} />
      <Button text='bad' onClick={handleBadFeedback} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App