import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Welcome to the Home Page</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/todolist')}>
        Go to Todolist
      </Button>
    </Container>
  );
};

export default Home;