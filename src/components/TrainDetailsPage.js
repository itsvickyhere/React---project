import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, List, ListItem, ListItemText, Checkbox, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const trains = [
  { name: "Rajdhani Express", departure: "08:00 AM", arrival: "04:00 PM", via: "Kanpur", seatsAvailable: 5, category: "Sleeper" },
  { name: "Shatabdi Express", departure: "06:00 AM", arrival: "02:00 PM", via: "Agra", seatsAvailable: 0, category: "Semi-Sleeper" },
  // Add more train data with categories
];

function TrainDetailsPage() {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredTrains = trains.filter(train =>
    train.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
  };

  const handleConfirm = () => {
    if (selectedTrain) {
      navigate('/passenger-details');
    } else {
      alert("Please select a train.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Available Trains
        </Typography>
        <TextField
          fullWidth
          label="Search Trains"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List>
          {filteredTrains.map((train, index) => (
            <ListItem
              key={index}
              button
              disabled={train.seatsAvailable === 0}
              onClick={() => handleTrainSelect(train)}
              sx={{ backgroundColor: train.seatsAvailable > 0 ? (train.seatsAvailable < 5 ? 'orange' : 'green') : 'red', color: 'white', mb: 1, borderRadius: 2 }}
            >
              <Checkbox
                edge="start"
                checked={selectedTrain?.name === train.name}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={`${train.name} (${train.category})`}
                secondary={`Departure: ${train.departure}, Arrival: ${train.arrival}, Via: ${train.via}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Confirm Train
        </Button>
      </Box>
    </Container>
  );
}

export default TrainDetailsPage;
