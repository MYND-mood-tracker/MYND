import React, { useState, useEffect } from 'react';

const weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyMoods = () => {
  const [weeklyMoodsData, setWeeklyMoodsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/weekly-moods')  
      .then((response) => response.json())
      .then((data) => {
        setWeeklyMoodsData(data);
      })
      .catch((error) => {
        console.error('Error fetching weekly moods data:', error);
      });
  }, []);

  const calculateAverageMood = () => {
    if (weeklyMoodsData.length === 0) return null;
    const totalMood = weeklyMoodsData.reduce((acc, entry) => acc + parseInt(entry.number), 0);
    return Math.round(totalMood / weeklyMoodsData.length);
  };

  const getAverageMoodColorClass = () => {
    const averageMood = calculateAverageMood();
    if (averageMood >= 1 && averageMood <= 5) {
      return `circle-${averageMood}`;
    }
    return 'circle';
  };

  const renderWeeklyMoodsData = () => {
    return weekArray.map((day, index) => {
      const moodEntry = weeklyMoodsData.find((entry) => entry.day === day);
      return (
        <div key={index} className="day-box">
          <div>{day}</div>
          {moodEntry ? (
            <div className={`circle circle-${moodEntry.number}`}>
              <div className="number">{moodEntry.number}</div>
            </div>
          ) : (
            <div>No data</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="weekly-moods-container">
      <div className="week-calendar">
        {renderWeeklyMoodsData()}
      </div>
      <div className="average-mood-container">
        <div className="average-mood-message">Your weekly average for this week was:</div>
        <div className={`circle ${getAverageMoodColorClass()}`}>
          <div className="number">{calculateAverageMood()}</div>
        </div>
      </div>
      <div className="positive-message">
      </div>
    </div>
  );
};

export default WeeklyMoods;
