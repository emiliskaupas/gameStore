const pool = require('./database');

/**
 * Initialize the database schema
 */
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        description TEXT,
        genre VARCHAR(100),
        region VARCHAR(50),
        release_date DATE,
        rating DECIMAL(3, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add region column if it doesn't exist
    await pool.query(`
      ALTER TABLE games ADD COLUMN IF NOT EXISTS region VARCHAR(50);
    `);

    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = { initDatabase };
