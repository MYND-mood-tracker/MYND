import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Hey, how did you feel today?</h1>
        <input type="number" min="1" max="5" />
        <button>Submit</button>
      </div>
    )
  }
}

export default LandingPage;