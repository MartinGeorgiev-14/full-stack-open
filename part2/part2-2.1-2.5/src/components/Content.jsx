import { useState } from "react"

const Content = ({parts}) => {
    
    const totalEx = parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    }, 0)
   

    return(
        <>
            {parts.map(el => (<Part key={el.id} name={el.name} exercises={el.exercises}/>))}
            <p><b>Total of {totalEx} exercises</b></p>
        </>
    )
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

export default Content