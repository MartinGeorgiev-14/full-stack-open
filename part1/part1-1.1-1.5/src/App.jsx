import { useEffect, useState } from 'react'

const Header = (prop) => {

  return(
    <div>
      <h1>{prop.course}</h1>
    </div>
  )
}

const Content = (prop) => {
  let accumulator = []
  for (let i = 0; i < prop.courses.length; i++) {
    accumulator.push(
      <Parts key={i} course={prop.courses[i]} exercise={prop.exercises[i]}/>
    );
  }

  return (
    <div>
      {accumulator}
    </div>
  );
}

const Parts = (prop) => {

  return(
    <div>
      <p>{prop.course} {prop.exercise}</p>
    </div>
  )
}

const Total = (prop) => {
  const total = prop.arr.reduce((a,c) => a + c, 0)
  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]


  return(
    <div>
      <Header course={course}/>
      <Content courses={[parts[0].name, parts[1].name, parts[2].name]} exercises={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
      <Total arr={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
    </div>
  )
}


const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>


export default App
