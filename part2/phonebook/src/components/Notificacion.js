import React from 'react'

const Notification = ({message, success}) => {
    const style = {
        background: success ? 'grey' : 'crimson',
        border: `1px solid ${success ? 'green' : 'red'}`,
        borderRadius: '5px',
        marginBottom: '20px',
        padding: '5px',
        fontSize: '18px',
        color: 'white'
    }
    return (
        <div style={style}>
            <p>{message}</p>
        </div>
    )
}

export default Notification
