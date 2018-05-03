import React from 'react'
import Weather from './weather'

export default props => (
    <div id='overlay'>
        <div id="textError">{props.value}</div>
        <button onClick={props.handleHideErrorMessage} id="btnErrorConfirm" className="btn btn-default">Entendi</button>
    </div>
)