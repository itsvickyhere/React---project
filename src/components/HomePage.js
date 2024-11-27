// import React, { useState } from 'react';
// import { Button, TextField, Typography, Container, Box, MenuItem } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';

// const stations = [
//   "New Delhi", "Mumbai Central", "Howrah Junction", // Add more stations
// ];

// function HomePage() {
//   const [departure, setDeparture] = useState('');
//   const [arrival, setArrival] = useState('');
//   const [departureDate, setDepartureDate] = useState(dayjs().format('YYYY-MM-DD'));
//   const [arrivalDate, setArrivalDate] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (arrivalDate < departureDate) {
//       alert('Arrival date cannot be before departure date.');
//       return;
//     }
//     navigate('/train-details');
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Book Your Train
//         </Typography>
//         <TextField
//           fullWidth
//           select
//           label="Departure Station"
//           variant="outlined"
//           margin="normal"
//           value={departure}
//           onChange={(e) => setDeparture(e.target.value)}
//           required
//         >
//           {stations.map((station) => (
//             <MenuItem key={station} value={station}>
//               {station}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           fullWidth
//           select
//           label="Arrival Station"
//           variant="outlined"
//           margin="normal"
//           value={arrival}
//           onChange={(e) => setArrival(e.target.value)}
//           required
//         >
//           {stations.map((station) => (
//             <MenuItem key={station} value={station}>
//               {station}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           fullWidth
//           label="Departure Date"
//           variant="outlined"
//           margin="normal"
//           type="date"
//           value={departureDate}
//           onChange={(e) => setDepartureDate(e.target.value)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           min={dayjs().format('YYYY-MM-DD')}
//         />
//         <TextField
//           fullWidth
//           label="Arrival Date"
//           variant="outlined"
//           margin="normal"
//           type="date"
//           value={arrivalDate}
//           onChange={(e) => setArrivalDate(e.target.value)}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           min={departureDate}
//         />
//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           onClick={handleSearch}
//           sx={{ borderRadius: 5, mt: 2 }}
//         >
//           Search Trains
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// export default HomePage;
// HomePage.js
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage({ currentUser, onRemoveUser }) {
  const navigate = useNavigate();

  const handleRemoveUser = () => {
    console.log('Remove User button clicked');
    if (window.confirm('Are you sure you want to delete your account?')) {
      console.log('User confirmed account deletion');
      onRemoveUser(navigate);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.fullName || 'Guest'}!
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleRemoveUser}>
          Remove User
        </Button>
      </Box>
      {/* Additional home page content */}
    </Container>
  );
}

export default HomePage;
