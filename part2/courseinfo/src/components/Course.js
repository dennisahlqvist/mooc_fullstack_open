import React from 'react'


const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}


const Part = (props) => {
  return (
  <p>
    {props.part} {props.exercises}
  </p>
  )
}

const Content = (props) => {
  return (
  <div>
    {props.course.parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
  </div>
  )

}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}


const Total = (props) => {
  const sum = 
  props.course.parts.reduce((sum, part) => sum + part.exercises,0)

  return (
    <p>Number of exercises {sum}</p>
  )
}



export default Course