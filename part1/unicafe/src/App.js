import { useState } from 'react'




const Statistics = (props) => {
  if(props.all === 0){
    return (<div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.all}</div>
      <div>average {props.average}</div>
      <div>positive {props.positive} %</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const average = ((good*1)+(neutral*0)+(bad*-1))/all
  const positive = good/all*100


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>



    </div>
  )
}

export default App