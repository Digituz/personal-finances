import React, {Component} from 'react';
import './Callback.css';

const defaultMessage = 'Loading profile';

class Callback extends Component {
  constructor(props) {
    super(props);

    const self = this;
    self.state = {
      message: 'Loading profile',
    };

    self.interval = setInterval(() => {
      let message = self.state.message;
      if (message.length === 18) {
        message = defaultMessage;
      } else {
        message += '.';
      }
      self.setState({
        message,
      });
      console.log('here we go');
    }, 500);
  }

  render() {
    return (
      <div className="react-callback">
        {this.state.message}
      </div>
    );
  }

  componentWillUnmount() {

  }
}

export default Callback;
