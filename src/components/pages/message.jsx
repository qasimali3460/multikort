import React from 'react'

export default function message(props) {
    const {message, danger} = props
    return (
        <div className={`alert ${danger ? 'alert-danger': 'alert-success'}`}>
            {message}
        </div>
    )
}
