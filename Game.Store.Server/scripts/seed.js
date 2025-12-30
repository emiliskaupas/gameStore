const pool = require('../config/database');
const { initDatabase } = require('../config/init');
const GameRepository = require('../repositories/GameRepository');

const seedGames = [
  {
    title: 'FIFA 23 Steam Key (Global)',
    price: 59.99,
    image_url: '/images/fifa23.png',
    description: 'Experience the world\'s game with over 19,000 players, 700+ teams, and 30+ leagues in FIFA 23. Feel closer to the game with three cutting-edge technologies powering unparalleled realism in every match.',
    genre: 'Sports',
    region: 'Global',
    release_date: '2022-09-30',
    rating: 4.5
  },
  {
    title: 'Red Dead Redemption 2 Key (Xbox Global)',
    price: 49.99,
    image_url: '/images/Red_Dead_Redemption_II.jpg',
    description: 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is an epic tale of honor and loyalty at the dawn of the modern age. Includes Red Dead Online.',
    genre: 'Action, Adventure',
    region: 'Global',
    release_date: '2018-10-26',
    rating: 4.8
  },
  {
    title: 'Split Fiction Key (Playstation 4 Global)',
    price: 39.99,
    image_url: '/images/split_fictionjpg.jpg',
    description: 'From the creators of It Takes Two, embark on a genre-bending platform adventure. Two writers, Mio and Zoe, get trapped in a world of their own stories and must work together to escape.',
    genre: 'Action, Adventure',
    region: 'Global',
    release_date: '2024-03-06',
    rating: 4.6
  },
  {
    title: 'It Takes Two PC key (Europe)',
    price: 39.99,
    image_url: '/images/it_takes_two.jpg',
    description: 'Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op. Play as the clashing couple Cody and May, two humans turned into dolls by a magic spell.',
    genre: 'Action, Adventure',
    region: 'Europe',
    release_date: '2021-03-26',
    rating: 4.7
  },
  {
    title: 'The Last of Us Part II Key (PS4 Asia)',
    price: 44.99,
    image_url: '/images/the_last_of_us_part_1.png',
    description: 'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming. Living amongst a thriving community of survivors has allowed them peace and stability.',
    genre: 'Action, Adventure',
    region: 'Asia',
    release_date: '2020-06-19',
    rating: 4.6
  },
  {
    title: 'God of War Ragnarök Key (Xbox Global)',
    price: 69.99,
    image_url: '/images/god_of_war.png',
    description: 'Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives. Together, they must choose between their own safety and the safety of the realms.',
    genre: 'Action, Adventure',
    region: 'Global',
    release_date: '2022-11-09',
    rating: 4.9
  },
    {
    title: 'God of War Ragnarök Key (PC Global)',
    price: 69.99,
    image_url: '/images/god_of_war.png',
    description: 'Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives. Together, they must choose between their own safety and the safety of the realms.',
    genre: 'Action, Adventure',
    region: 'Global',
    release_date: '2022-11-09',
    rating: 4.9
  },
  {
    title: 'Elden Ring Standard Edition (PC Global)',
    price: 59.99,
    image_url: '/images/elden_ring.png',
    description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    genre: 'Action, RPG',
    region: 'Global',
    release_date: '2022-02-25',
    rating: 4.7
  },
  {
    title: 'Elden Ring App Key (PC Global)',
    price: 49.99,
    image_url: '/images/elden_ring.png',
    description: 'Digital key for Elden Ring (PC, Global region). Includes base game and bonus content.',
    genre: 'Action, RPG',
    region: 'Global',
    release_date: '2022-02-25',
    rating: 4.7
  },
  {
    title: 'Elden Ring App Key (Xbox Asia)',
    price: 54.99,
    image_url: '/images/elden_ring.png',
    description: 'Xbox digital key for Elden Ring. Redeemable worldwide. Includes exclusive in-game items.',
    genre: 'Action, RPG',
    region: 'Asia',
    release_date: '2022-02-25',
    rating: 4.7
  },
  {
    title: 'Elden Ring App Key (PlayStation Asia)',
    price: 57.99,
    image_url: '/images/elden_ring.png',
    description: 'PlayStation digital key for Elden Ring. Global activation. Includes bonus soundtrack.',
    genre: 'Action, RPG',
    region: 'Asia',
    release_date: '2022-02-25',
    rating: 4.7
  },
  {
    title: 'Elden Ring Deluxe Edition (PC Global)',
    price: 69.99,
    image_url: '/images/elden_ring.png',
    description: 'Deluxe Edition of Elden Ring for PC (Global). Includes base game, digital artbook, and soundtrack.',
    genre: 'Action, RPG',
    region: 'Global',
    release_date: '2022-02-25',
    rating: 4.8
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Initialize database schema
    await initDatabase();
    console.log('✅ Database schema initialized\n');

    // Clear existing games
    await pool.query('DELETE FROM games');
    console.log('🧹 Cleared existing games\n');

    // Insert seed data using repository
    for (const game of seedGames) {
      const createdGame = await GameRepository.create(game);
      console.log(`✓ Added: ${createdGame.title}`);
    }

    console.log('\n========================================');
    console.log('✅ Database seeded successfully!');
    console.log(`📦 Total games added: ${seedGames.length}`);
    console.log('========================================\n');
    
    // Display games list
    console.log('Games in database:');
    seedGames.forEach((game, index) => {
      console.log(`  ${index + 1}. ${game.title} - $${game.price}`);
    });
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error('\nPlease make sure:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database credentials in .env are correct');
    console.error('3. Database "gamestore" exists (run: npm run db:create)\n');
    process.exit(1);
  }
};

seedDatabase();
