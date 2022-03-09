import React from 'react'
import { Consumer } from './FormContext'

export default function Button(props) {
    return (
        <Consumer>
            {value => {
                return (
                    <button onClick={() => {
                        value.submit && value.submit();
                    }}>
                        {props.children}
                    </button>
                )
            }}

        </Consumer>

    )
}
