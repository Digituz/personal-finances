import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import PanelHeader from '@digituz/react-panel-header';
import PanelBody from '@digituz/react-panel-body';
import Button from '@digituz/react-button';
import Card from '@digituz/react-card';
import Panel from '@digituz/react-panel';
import './App.css';

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
      <Panel>
        <PanelHeader title="Personal Finances">
          <Button onClick={this.signIn} text="Sign In" />
        </PanelHeader>
        <PanelBody>
          <Card className="col-sm-12 col-md-4 col-lg-8">
            <h2>Testing</h2>
            <p>Is it working?</p>
            <p>Is it working?</p>
            <p>Is it working?</p>
            <p>Is it working?</p>
          </Card>
        </PanelBody>
      </Panel>
    );
  }
}

export default App;
