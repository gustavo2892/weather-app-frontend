import React from 'react'
import Weather from './weather'

export default props => (
    <div>
        <div id='resultTemperature'>{props.location}
            <div>
                <img src={props.icon} height="50" width="50" id='iconWeather' />
                <p id="textTemperature">{props.value}</p>
            </div>
        </div>
        <hr id="section02"></hr>
        <button onClick={props.handleClean} id="btnClean" className="btn btn-danger">Nova Busca</button>
    </div>
)