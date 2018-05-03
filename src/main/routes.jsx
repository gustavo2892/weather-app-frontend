import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import Weather from '../weather/weather'

export default props => (
    <Router history = { hashHistory }>
        <Route path = '/weather' component = { Weather }/>
        <Redirect from = '*' to = '/weather'/>
    </Router>
)