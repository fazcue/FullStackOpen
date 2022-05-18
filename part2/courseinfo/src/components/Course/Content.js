import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    const total = parts.reduce((acc, curr) => {
        return acc + curr.exercises
    }, 0)

    return (
        <>
            <ul>
                {parts.map(part => {
                    return <Part name={part.name} exercises={part.exercises} key={part.id} />
                })}
            </ul>
            <p>total of {total} exercises</p>
        </>

    )
}

export default Content