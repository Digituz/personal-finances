import * as Auth0 from 'auth0-web';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Grid, If} from '@digituz/react-components';

class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: Auth0.isAuthenticated(),
    };
  }

  componentDidMount() {
    Auth0.subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      this.setState({
        isAuthenticated
      });
    });
  }

  render() {
    return (
      <Card
        title="Welcome!"
        className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2 xl-6 xl-pad-3">
        <Grid>
          <p className="sm-12">
            The goal of this app is to help users to manage their
            money more easily. Here, users can:
          </p>
          <ul className="sm-12">
            <li>Input expenses.</li>
            <li>Input incomes.</li>
            <li>Define monthly goals.</li>
            <li>Track status through nice charts.</li>
          </ul>
          <If condition={!this.state.isAuthenticated}>
            <p className="sm-12">
              To start using the app, please, sign in!
            </p>
            <div className="sm-12 center">
              <Button onClick={Auth0.signIn} text="Sign In" />
            </div>
          </If>
          <If condition={this.state.isAuthenticated}>
            <p className="sm-12">
              To start using the app, choose an option on the vertical menu.
            </p>
          </If>
        </Grid>
      </Card>
    );
  }
}

LandingPage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default LandingPage;
