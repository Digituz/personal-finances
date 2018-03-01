import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import Header from '@digituz/react-header';
import Button from '@digituz/react-button';
import './App.css';
import {
  Route,
} from 'react-router-dom';
import Callback from './Callback/Callback';
import LandingPage from './LandingPage/LandingPage';

class App extends Component {
  constructor(props) {
    super(props);
    Auth0.configure({
      domain: 'digituz-corp.auth0.com',
      audience: 'https://personal-finances.digituz.com.br',
      clientID: 'wtgLEhG40Ns5v1HtHlZ3ZkKlci2McuUa',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile manage:finances'
    });
  }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;

  render() {
    return (
      <div className="digituz-panel">
        <div className="digituz-panel-coloured-border" />
        <div className="digituz-panel-header">
          <Header title="Personal Finances">
            <Button onClick={this.signIn} text="Sign In" />
          </Header>
        </div>
        <div className="digituz-panel-body">
          <Route path="/" component={LandingPage}/>
          <Route path="/callback" component={Callback}/>
        </div>
      </div>
    );
  }
}

export default App;
