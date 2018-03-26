import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Button, If, Modal, Panel, PanelBody, PanelHeader, VerticalMenu} from '@digituz/react-components';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Callback from './Callback/Callback';
import Income from './Income/Income';
import Incomes from './Income/Incomes';

class App extends Component {
  constructor(props) {
    super(props);
    Auth0.configure({
      domain: 'digituz-corp.auth0.com',
      audience: 'https://personal-finances.digituz.com.br',
      clientID: 'wtgLEhG40Ns5v1HtHlZ3ZkKlci2McuUa',
      redirectUri: `${window.location.origin}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile ' +
              'put:personal-finances ' +
              'delete:personal-finances ' +
              'post:personal-finances ' +
              'get:personal-finances'
    });

    this.state = {
      showModal: false,
      modalTitle: '',
      modalMessage: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  signIn = Auth0.signIn;

  signOut = () => {
    Auth0.signOut({
      returnTo: `${window.location.origin}`,
      clientID: 'wtgLEhG40Ns5v1HtHlZ3ZkKlci2McuUa',
    })
  };

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  showModal(modalTitle, modalMessage) {
    this.setState({
      showModal: true,
      modalTitle,
      modalMessage,
    });
  }

  guardedRoute(url) {
    if (Auth0.isAuthenticated()) return this.go(url);
    this.setState({
      modalTitle: 'Hello there!',
      modalMessage: 'Hey there! To use this functionality, first, you have to sign in. There is a button on the ' +
      'top right corner, hit it to start using this app.',
      showModal: true,
    });
  }

  go(url) {
    this.props.history.push(url);
  }

  render() {
    const divStyle = {
      display: 'grid',
      gridTemplateColumns: '45px 1fr auto',
    };

    const submenus = [{
      title: 'Menu',
      items: [
        { title: 'Overview', color: 'gray', onClick: () => { this.guardedRoute() } },
        { title: 'Expenses', color: '#e6665b', onClick: () => { this.guardedRoute() } },
        { title: 'Incomes', color: '#66ad66', onClick: () => { this.guardedRoute('/income') } },
        { title: 'Goals', color: '#5e5eff', onClick: () => { this.guardedRoute() } },
        { title: 'Configuration', color: 'gray', onClick: () => { this.guardedRoute() } }
      ]
    }];

    return (
      <Panel>
        <PanelHeader>
          <div style={divStyle}>
            <VerticalMenu submenus={submenus} />
            <h1 onClick={() => { this.go('/') }}>Personal Finances</h1>
            <div className="horizontal-menu">
              <If condition={!Auth0.isAuthenticated()}>
                <Button onClick={this.signIn} text="Sign In" />
              </If>
              <If condition={Auth0.isAuthenticated()}>
                <Button onClick={this.signOut} text="Sign Out" />
              </If>
            </div>
          </div>
        </PanelHeader>
        <PanelBody>
          <If condition={this.state.showModal}>
            <Modal onSuccess={() => { this.toggleModal() }}>
              <h3>{this.state.modalTitle}</h3>
              <p>{this.state.modalMessage}</p>
            </Modal>
          </If>

          <Route exact path="/" render={() => (
            <LandingPage toggleModal={this.toggleModal}/>
          )} />
          <Route path="/callback" component={Callback} />
          <Route path="/income" render={() => (
            <Income showModal={this.showModal}/>
          )} />
          <Route path="/incomes" component={Incomes} />
        </PanelBody>
      </Panel>
    );
  }
}

export default withRouter(App);
