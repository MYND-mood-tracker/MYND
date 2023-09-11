const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();
const path = require('path'); // Import the path module
const port = 5002;

// Connect to MongoDB
const password = '9yXv9HZRBZfwYeMj';
const username = 'ahnafkhan3';
const clusterName = 'cluster1';
const clusterAddress = 'ipdrr19.mongodb.net';
const databaseName = 'my-database';

const connectionString = `mongodb+srv://${username}:${password}@${clusterName}.${clusterAddress}/${databaseName}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const selectedNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SelectedNumber = mongoose.model('SelectedNumber', selectedNumberSchema);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', 
}));

app.post('/api/selected-number', async (req, res) => {
  try {
    const { number } = req.body;
    const selectedNumber = new SelectedNumber({ number });
    await selectedNumber.save();
    res.status(201).json({ message: 'Selected number saved successfully' });
  } catch (error) {
    console.error('Error saving selected number:', error);
    res.status(500).json({ error: 'Failed to save selected number' });
  }
});

app.get('/api/weekly-moods', async (req, res) => {
  try {
    const selectedNumbers = await SelectedNumber.find();
    res.json(selectedNumbers);
  } catch (error) {
    console.error('Error fetching weekly moods:', error);
    res.status(500).json({ error: 'Failed to fetch weekly moods' });
  }
});

// Serve the React app on the root URL
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// New route for calculating weekly moods
app.get('/weekly-moods', async (req, res) => {
  try {
    const weeklyMoodsData = await SelectedNumber.find();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Initialize an empty object to store the data for each day of the week
    const weeklyMoods = {};
    daysOfWeek.forEach((day) => {
      weeklyMoods[day] = { number: 'No data' };
    });

    // Fill the weeklyMoods object with data from the weeklyMoodsData
    weeklyMoodsData.forEach((entry) => {
      const { day, number } = entry;
      weeklyMoods[day] = { number };
    });

    // Calculate the average mood for the week
    const totalMood = weeklyMoodsData.reduce((acc, entry) => acc + parseInt(entry.number), 0);
    const averageMood = Math.round(totalMood / weeklyMoodsData.length);

    // Add the average mood to the weeklyMoods object
    weeklyMoods['average'] = { number: averageMood };

    res.json(weeklyMoods);
  } catch (error) {
    console.error('Error calculating weekly moods:', error);
    res.status(500).json({ error: 'Failed to calculate weekly moods' });
  }
});
