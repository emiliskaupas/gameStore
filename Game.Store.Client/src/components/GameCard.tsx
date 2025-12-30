import { Link } from 'react-router-dom';
import type { Game } from '../services/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const price =
    typeof game.price === 'number' && !isNaN(game.price)
      ? `$${game.price.toFixed(2)}`
      : typeof game.price === 'string' && !isNaN(parseFloat(game.price))
      ? `$${parseFloat(game.price).toFixed(2)}`
      : 'N/A';

  const API_BASE_URL = 'http://localhost:5000';
  const getImageUrl = (url: string) =>
    url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  return (
    <Card
      component={Link}
      to={`/game/${game.id}`}
      sx={{
        background: '#1a0033',
        borderRadius: '18px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        height: 660,
        width: 320,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
        border: '2.5px solid #2d0b4e',
        transition: 'box-shadow 0.2s, border 0.2s, transform 0.2s',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.03)',
          boxShadow: '0 16px 40px 0 rgba(91,0,180,0.30)',
          border: '2.5px solid #ff2e9a',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 460, overflow: 'hidden', background: '#2d0b4e' }}>
        <CardMedia
          component="img"
          image={getImageUrl(game.image_url)}
          alt={game.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderBottom: '2px solid #3a0e6e',
            transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
            '&:hover': {
              transform: 'scale(1.07)',
            },
          }}
        />
        <Box sx={{
          position: 'absolute',
          left: 12,
          top: 12,
          background: '#00e1ff',
          color: '#1a0033',
          fontSize: 13,
          fontWeight: 700,
          borderRadius: '8px',
          px: 1.5,
          py: 0.5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          letterSpacing: 1,
          zIndex: 2,
        }}>
          CASHBACK
        </Box>
        <Box sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: '#fff',
          color: '#ffb800',
          px: 1.25,
          py: 0.5,
          borderRadius: '16px',
          fontSize: 15,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          zIndex: 2,
        }}>
          <StarIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: 'middle' }} />
          {game.rating}
        </Box>
      </Box>
      <CardContent
        sx={{
          padding: '24px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          background: '#1a0033',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 2px 0',
              whiteSpace: 'normal',
              letterSpacing: 1,
            }}
          >
            {game.title}
          </Typography>
          <Typography
            sx={{
              color: '#00e1ff',
              fontSize: 18,
              fontWeight: 600,
              marginBottom: '2px',
              letterSpacing: 0.5,
            }}
            noWrap
          >
            {game.genre}
          </Typography>
            <Typography
              sx={{
                color: '#00ff99', // green
                fontSize: 18,
                fontWeight: 600,
                marginBottom: '2px',
                letterSpacing: 0.5,
                display: 'inline',
              }}
              noWrap
            >
              {game.region}
            </Typography>
        </Box>
        <Typography
          sx={{
            color: '#ff2e9a',
            fontSize: 28,
            fontWeight: 900,
            marginTop: '8px',
            letterSpacing: 1,
          }}
        >
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
