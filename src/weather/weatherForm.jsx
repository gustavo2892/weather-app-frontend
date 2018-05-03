import React, { Component } from 'react'

export default class WeatherForm extends Component {

    render() {
        return (
            <div id='formWeather'>
                <label htmlFor="txtCity" id='lbCity'><b>Digite a Cidade</b></label>
                <input className='form-control' id="txtCity"
                    onChange={this.props.handleChangeCity}
                    value={this.props.city} />
                <label htmlFor="txtStateCity" id='lbStateCity'><b>Digite a UF </b>(Ex: SP)</label>
                <input className='form-control' id="txtStateCity" maxLength="2"
                    onChange={this.props.handleChangeStateCity}
                    value={this.props.stateCity} />
                <hr id="section"></hr>
                <button onClick={this.props.handleGetWeather} id="btnConfirm" className="btn btn-success">Confirmar</button>
            </div>
        )
    }
}