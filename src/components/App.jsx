import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import ResultPage from './components/ResultPage.jsx';

const App = () => {
  return (
    <div>
      <h1>MYND</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/result/:selectedNumber" component={ResultPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
