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



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
    {courses.map(course => 
      <Course key={courses.id} course={course} />
    )}
    </div>
  )


  
}

export default App