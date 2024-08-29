import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { saveAs } from 'file-saver';

const TicketDownload = ({ passengerDetails, trainDetails, dates }) => {

  const generateTicketContent = () => {
    let ticketContent = `TICKET CONFIRMATION\n\n`;
    ticketContent += `Train: ${trainDetails.name}\n`;
    ticketContent += `Departure Time: ${trainDetails.departure}\n`;
    ticketContent += `Arrival Time: ${trainDetails.arrival}\n\n`;

    ticketContent += `Passenger Details:\n`;
    passengerDetails.forEach((passenger, index) => {
      ticketContent += `${index + 1}. ${passenger.name} (${passenger.age} years) - Seat: ${passenger.seat}, Category: ${passenger.category}, Price: ₹${passenger.price}\n`;
    });
    ticketContent += `\nDates:\n`;
    ticketContent += `Departure Date: ${dates.departureDate}\n`;
    ticketContent += `Arrival Date: ${dates.arrivalDate}\n\n`;

    ticketContent += `Thank you for booking with us!`;

    return ticketContent;
  };

  const handleDownload = () => {
    const ticketContent = generateTicketContent();
    const blob = new Blob([ticketContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "ticket.txt");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Ticket Confirmation
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Train: {trainDetails.name}</Typography>
          <Typography variant="body1">Departure Time: {trainDetails.departure}</Typography>
          <Typography variant="body1">Arrival Time: {trainDetails.arrival}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Passenger Details:</Typography>
          {passengerDetails.map((passenger, index) => (
            <Typography key={index} variant="body1">
              {passenger.name} ({passenger.age} years) - Seat: {passenger.seat}, Category: {passenger.category}, Price: ₹{passenger.price}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Dates:</Typography>
          <Typography variant="body1">Departure Date: {dates.departureDate}</Typography>
          <Typography variant="body1">Arrival Date: {dates.arrivalDate}</Typography>
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          Thank you for booking with us!
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleDownload}
          sx={{ borderRadius: 5, mt: 2 }}
        >
          Download Ticket
        </Button>
      </Box>
    </Container>
  );
};

export default TicketDownload;
