import React, { useState, useEffect } from 'react';

const weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyMoods = () => {
  const [weeklyMoodsData, setWeeklyMoodsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5002/api/weekly-moods') 
      .then((response) => response.json())
      .then((data) => {
        setWeeklyMoodsData(data);
      })
      .catch((error) => {
        console.error('Error fetching weekly moods data:', error);
      });
  }, []);
  
  const setWeek = true;

  // Function to calculate average mood for the week
  const calculateAverageMood = () => {
    if (weeklyMoodsData.length === 0) return null;
    const totalMood = weeklyMoodsData.reduce((acc, entry) => acc + parseInt(entry.number), 0);
    return Math.round(totalMood / weeklyMoodsData.length);
  };

  // Function to get the color class for the average mood
  const getAverageMoodColorClass = () => {
    const averageMood = calculateAverageMood();
    if (averageMood >= 1 && averageMood <= 5) {
      return `circle-${averageMood}`;
    }
    return 'circle';
  };

  // Helper function to get the day of the week from a date string
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  };

  // New function to render the weekly moods data for each day
  const renderWeeklyMoodsData = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return daysOfWeek.map((day, index) => {
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
      {/* Week Calendar */}
      <div className="week-calendar">
        {renderWeeklyMoodsData()}
      </div>

      {/* Display the average mood */}
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
