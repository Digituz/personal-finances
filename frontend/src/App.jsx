import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import {
  PanelHeader, PanelBody, Button, If,
  Grid, Modal, Card, Panel, VerticalMenu
} from '@digituz/react-components';
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

    this.state = {
      showModal: true,
    }
  }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    const divStyle = {
      display: 'grid',
      gridTemplateColumns: '45px 1fr auto',
    };

    const submenus = [{
      title: 'Menu',
      items: [
        { title: 'Overview', color: 'gray', onClick: () => {} },
        { title: 'Expenses', color: '#e6665b', onClick: () => {} },
        { title: 'Incomes', color: '#66ad66', onClick: () => {} },
        { title: 'Goals', color: '#5e5eff', onClick: () => {} },
        { title: 'Configuration', color: 'gray', onClick: () => {} }
      ]
    }];

    return (
      <Panel>
        <PanelHeader>
          <div style={divStyle}>
            <VerticalMenu submenus={submenus} />
            <h1>Personal Finances</h1>
            <div className="horizontal-menu">
              <Button onClick={this.signIn} text="Sign In" />
            </div>
          </div>
        </PanelHeader>
        <PanelBody>
          <If condition={this.state.showModal}>
            <Modal onSuccess={() => { this.toggleModal() }}>
              <h3>Delete?</h3>
              <p>This action cannot be undone.</p>
            </Modal>
          </If>
          <Card
            title="Welcome!"
            className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2 xl-6 xl-pad-3">
            <Grid>
              <p className="sm-12">
                The goal of this app is to help users to manage their
                money more easily. Here, users will be able to:
              </p>
              <ul className="sm-12">
                <li>Input expenses.</li>
                <li>Input incomes.</li>
                <li>Define monthly goals.</li>
                <li>Track status through nice charts.</li>
              </ul>
              <p className="sm-12">
                To start using the app, please, sign in!
              </p>
              <div className="sm-12 center">
                <Button onClick={() => { this.toggleModal() }} text="Sign In" />
              </div>
            </Grid>
          </Card>
        </PanelBody>
      </Panel>
    );
  }
}

export default App;
