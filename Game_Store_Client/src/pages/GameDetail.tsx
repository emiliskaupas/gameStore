import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameAPI } from '../services/api';
import type { Game } from '../services/api';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGame();
  }, [id]);

  const fetchGame = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await gameAPI.getGameById(Number(id));
      setGame(data);
    } catch (err) {
      setError('Failed to fetch game details. Please try again later.');
      console.error('Error fetching game:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
        Loading game details...
      </Typography>
    );
  }

  if (error || !game) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Game not found'}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Games
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        ← Back to Games
      </Button>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          p: 0,
          background: '#1a0033',
          borderRadius: '18px',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          border: '2.5px solid #2d0b4e',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={game.image_url.startsWith('http')
            ? game.image_url
            : `${import.meta.env.VITE_API_BASE_URL}${game.image_url}`}
          alt={game.title}
          sx={{
            width: { xs: '100%', md: 400 },
            height: { xs: 400, md: 600 },
            objectFit: 'cover',
            borderTopLeftRadius: '18px',
            borderBottomLeftRadius: { md: '18px' },
            borderTopRightRadius: { xs: '18px', md: 0 },
            borderBottomRightRadius: { xs: 0, md: 0 },
            borderRight: { md: '2px solid #2d0b4e' },
            borderBottom: { xs: '2px solid #2d0b4e', md: 0 },
            background: '#2d0b4e',
          }}
        />
        <CardContent sx={{
          flex: 1,
          ml: { md: 0 },
          mt: { xs: 3, md: 0 },
          p: { xs: 3, md: 4 },
          background: '#1a0033',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 8px 0',
              letterSpacing: 1,
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            }}
          >
            {game.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Typography
              sx={{
                color: '#00e1ff',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                background: 'rgba(0,225,255,0.08)',
              }}
              noWrap
            >
              {game.genre}
            </Typography>
            <Typography
              sx={{
                color: '#ffb800',
                fontSize: 18,
                fontWeight: 700,
                px: 2,
                py: 1,
                borderRadius: 2,
                background: 'rgba(255,184,0,0.08)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ marginRight: 6 }}>★</span> {game.rating}
            </Typography>
            {game.releaseYear && (
              <Typography
                sx={{
                  color: '#b9bbbe',
                  fontSize: 16,
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: 'rgba(185,187,190,0.08)',
                }}
              >
                {game.releaseYear}
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              color: '#ff2e9a',
              fontSize: 28,
              fontWeight: 900,
              marginTop: '8px',
              letterSpacing: 1,
              mb: 2,
            }}
          >
            {game.formattedPrice ||
              (typeof game.price === 'number'
                ? `$${game.price.toFixed(2)}`
                : typeof game.price === 'string' && !isNaN(parseFloat(game.price))
                ? `$${parseFloat(game.price).toFixed(2)}`
                : 'N/A')}
          </Typography>
          {game.description && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 700 }}>
                About
              </Typography>
              <Typography variant="body1" sx={{ color: '#b9bbbe', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                {game.description}
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" sx={{ fontWeight: 700, fontSize: 18, borderRadius: 2, width: '100%' }}>
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GameDetail;
