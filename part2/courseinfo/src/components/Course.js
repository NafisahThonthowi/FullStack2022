import React from 'react'

const Course = (props) => {
    return(
      <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total parts = {props.course.parts}/>
      </div>
    )
}
  
const Header = (props) => {
    return(
        <div>
            <h2>
                {props.course.name}
            </h2>
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            <p>
                {props.part} {props.exercise}
            </p>
        </div>
    )
}

const Content = (props) => {
    return(
        <div>
            {(props.parts).map(course => <Part key = {course.id} part = {course.name} exercise = {course.exercises}/>)}
        </div>
    )
}

const Total = (props) => {
    const exercisesArray = (props.parts).map(exercise => exercise.exercises) 
    const initialValue = 0;
    const total = exercisesArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue, initialValue
    );
    return(
        <div>
            <b>Total of {total} exercises</b>
        </div>
    )
}

export default Course