import React, {Component} from 'react';
import Header from '@digituz/react-header';
import Button from '@digituz/react-button';
import './App.css';

class App extends Component {
  heyThere() {
    alert('hey there!');
  }

  render() {
    return (
      <div>
        <Header title="Personal Finances"/>
        <Button onClick={this.heyThere} text="Hey there!" />
      </div>
    );
  }
}

export default App;
