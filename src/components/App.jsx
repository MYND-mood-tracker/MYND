//App dependencies

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import ResultPage from './ResultPage.jsx';
import WeeklyMoodsPage from './WeeklyMoods.jsx'; 

const App = () => {
  return (
    <div>
      <h1></h1>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/result/:selectedNumber" element={<ResultPage />} />
        <Route path="/weekly-moods" element={<WeeklyMoodsPage />} />
      </Routes>
    </div>
  );
};

export default App;
