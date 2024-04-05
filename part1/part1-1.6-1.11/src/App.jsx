import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avgScore, setAvgScore] = useState(0)
  const [positiveScore, setPositiveScore] = useState(0)

  const stats = [good, neutral, bad, total, avgScore, positiveScore]

  const handleGood = async () => {
    const goodInc = good + 1
    const totalInc = total + 1
    const calcAvg = (goodInc - bad) / totalInc
    const calcPositive = (goodInc / totalInc) * 100

    setGood(goodInc)
    setTotal(totalInc)
    setAvgScore(calcAvg)
    setPositiveScore(calcPositive)
  }

  const handleNeutral = () => {
    const neutralInc = neutral + 1
    const totalInc = total + 1
    const calcAvg = (good - bad) / totalInc
    const calcPositive = (good / totalInc) * 100

    setNeutral(neutralInc)
    setTotal(totalInc)
    setAvgScore(calcAvg)
    setPositiveScore(calcPositive)
  }

  const handleBad = () => {
    const badInc = bad + 1
    const totalInc = total + 1
    const calcAvg = (good - badInc) / totalInc
    const calcPositive = (good / totalInc) * 100

    setBad(badInc)
    setTotal(totalInc)
    setAvgScore(calcAvg)
    setPositiveScore(calcPositive)
  }

  return (
    <>
      <div>
        <Title text="give feedback" />
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>
      <Title text="statistics" />
      <Statistics stats={stats} />
    </>
  )
}

const Statistics = (props) => {
  let isFill = false

  props.stats.forEach(element => {
    if (element > 0) {
      isFill = true
    }
  })

  if (!isFill) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <table>
        <tbody>
            <StatisticLine text="good" number={props.stats[0]} />
            <StatisticLine text="neutral" number={props.stats[1]} />
            <StatisticLine text="bad" number={props.stats[2]} />
            <StatisticLine text="total" number={props.stats[3]} />
            <StatisticLine text="average" number={props.stats[4]} />
          <tr>
            <td>possitive</td><td>{props.stats[5]} %</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const Title = ({ text } = props) => <><h1>{text}</h1></>

const Button = ({ onClick, text } = props) => {

  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, number } = props) => <tr><td>{text}</td><td>{number}</td></tr>

export default App
