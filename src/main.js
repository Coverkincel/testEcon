import React, { Component } from 'react';
import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//routing

import PrivateRoute from './PrivateRoute';

//screens
import ResetPasswordScreen from './components/ResetPasswordScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import PrivateScreen from './components/PrivateScreen';
import Rating from './components/Rating';
import History from './components/History';


class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
            <div className='main'>
            {this.solvedTests}
            <Switch> 
                <PrivateRoute exact path = '/' component={PrivateScreen}/>
                <Route exact path='/login' component={LoginScreen} />
                <Route exact path='/register' component={RegisterScreen} />
                <Route exact path='/forgotpassword' component={ForgotPasswordScreen} />
                <Route exact path='/resetpassword/:resetToken' component={ResetPasswordScreen} />
                <Route exact path='/rating' component={Rating} />
                <Route exact path='/history' component={History} />
            </Switch>
            </div>
            </Router>
        )
    }
}

export default Main;