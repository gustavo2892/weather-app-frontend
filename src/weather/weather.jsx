import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import WeatherForm from './weatherForm'
import WeatherResult from './weatherResult'
import WeatherOverlay from './weatherOverlay'
import axios from 'axios'


export default class Weather extends Component {
    constructor (props){
        super(props)
        this.state = { 
            temperature: '', 
            city: '', 
            stateCity: '', 
            iconTemperature: '',
            showErrorMessage: false,
            showForm: true,
            showResult: false,
            errorMessage: '',
            location:'',
        }
        this.handleGetWeather = this.handleGetWeather.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.handleChangeStateCity = this.handleChangeStateCity.bind(this)
        this.handleHideErrorMessage = this.handleHideErrorMessage.bind(this)
        this.handleClean = this.handleClean.bind(this)
    }
    
    handleChangeCity(e) {
        this.setState({ city: e.target.value });
    }

    handleChangeStateCity(e) {
        this.setState({ stateCity: e.target.value });
    }

    handleGetWeather() {
        
        if(!this.state.city || !this.state.stateCity){
            let error = "PREENCHA TODOS OS CAMPOS";
            this.setState({ status: 'error' });
            this.handleShowErrorMessage(error);
            return null;
        }

        let city = this.state.city
        let stateCity = this.state.stateCity

        axios.get(`https://weather-app-backend-gvf15.herokuapp.com/weather?city=${city}&stateCity=${stateCity}`)
            .then(res => { 

                if (res.data.error == "OVER_QUERY_LIMIT") {
                    let error = "LIMITE DE CONSULTAS EXCEDIDO, TENTE NOVAMENTE";
                    this.setState({ status: 'error' });
                    this.handleShowErrorMessage(error);
                    return null;
                } else if (res.data.error == "ZERO_RESULTS") {
                    let error = "DIGITE NOVAMENTE A CIDADE E O ESTADO";
                    this.setState({ status: 'error' });
                    this.handleShowErrorMessage(error);
                    return null;
                } else {
                
                let location = this.state.city + ', ' + this.state.stateCity;
                location = location.toUpperCase();
                this.setState({
                    temperature: res.data.temperature,
                    location: location,
                    iconTemperature: "/" + res.data.iconTemperature + ".png",
                    showForm: false,
                    showResult: true });
                }
            })
            .catch ( err => {
                let error = 'PROBLEMA DE CONEXÃO COM O SERVIDOR, SOLICITE O SUPORTE TÉCNICO';
                this.setState({ status: 'error' });
                this.handleShowErrorMessage(error);
                return null;
            })
    }

    handleClean () {
        this.setState({ 
            city: undefined,
            location:undefined,
            temperature:undefined,
            stateCity: undefined ,
            showForm: true,
            showResult: false });
    }

    handleShowErrorMessage (error) {
        this.setState({
            errorMessage: error,
            showErrorMessage: true,
            city: undefined,
            temperature: '',
            stateCity: undefined,
            showForm: false,
        });
    }

    handleHideErrorMessage () {
        this.setState({ 
            showErrorMessage: false, 
            showForm: true,
        });
    }

    render () {
        return (
            <div>
                <PageHeader 
                    name = 'Tempo Agora'/>
                {
                    this.state.showErrorMessage && (<WeatherOverlay
                                                        value={this.state.errorMessage}
                                                        handleHideErrorMessage={this.handleHideErrorMessage}
                                                        />)
                }
                {
                    this.state.showForm && (<WeatherForm city={this.state.city} 
                                                value={this.state.showForm}
                                                handleChangeCity={this.handleChangeCity}
                                                handleChangeStateCity={this.handleChangeStateCity}
                                                handleGetWeather={this.handleGetWeather}
                                                />)
                }
                {
                    this.state.showResult && (<WeatherResult value={this.state.temperature}
                                                icon={this.state.iconTemperature}
                                                location={this.state.location}
                                                handleClean={this.handleClean}
                                                />)
                }
            </div>
        )
    }
}