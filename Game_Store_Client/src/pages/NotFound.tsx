import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>Back to Menu</Button>
    </Container>
  );
};

export default NotFound;
