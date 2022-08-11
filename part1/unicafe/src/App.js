import { useState } from 'react'

const Statistics = (props) => {
  if (props.counter === 0){
    return(<div>No feedback given</div>)
  }
  else{
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine name = "good" value={props.good} />
            <StatisticLine name = "neutral" value={props.neutral} />
            <StatisticLine name = "bad" value={props.bad} />
            <StatisticLine name = "all" value={props.all} />
            <StatisticLine name = "average" value={(props.good-props.bad)/props.all} />
            <StatisticLine name = "positive" value={(props.good)/props.all*100} />
          </tbody>
        </table>
      </div>
      )
  }
}

const StatisticLine = (props) =>{
  if(props.name==="positive"){
    return(
      <tr><td>{props.name}</td><td> {props.value}%</td></tr>
    )
  }
  else{
    return(
      <tr>
        <td>{props.name}</td> 
        <td>{props.value}</td>
      </tr>
    )
  }
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />

      <h1>statistics</h1>
      <Statistics counter={all} good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App