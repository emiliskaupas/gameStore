const pool = require('../config/database');
const GameModel = require('../models/GameModel');

/**
 * Game Repository (Data Access Layer)
 * Handles all database operations for games
 */
class GameRepository {
  /**
   * Get all games
   * @returns {Promise<Array>} Array of game objects
   */
  static async getAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM games ORDER BY created_at DESC'
      );
      return result.rows.map(row => new GameModel(row));
    } catch (error) {
      console.error('Error in GameRepository.getAll:', error);
      throw error;
    }
  }

  /**
   * Search games by title with fuzzy matching
   * @param {string} searchTerm - The search term
   * @returns {Promise<Array>} Array of matching game objects
   */
  static async search(searchTerm) {
    try {
      // Use PostgreSQL's ILIKE for case-insensitive fuzzy search
      // This allows partial matches (e.g., "fifa" matches "FIFA 23")
      const result = await pool.query(
        `SELECT * FROM games 
         WHERE title ILIKE $1 
         ORDER BY 
           CASE 
             WHEN title ILIKE $2 THEN 1  -- Exact match first
             WHEN title ILIKE $3 THEN 2  -- Starts with
             ELSE 3                       -- Contains
           END,
           created_at DESC`,
        [`%${searchTerm}%`, searchTerm, `${searchTerm}%`]
      );
      return result.rows.map(row => new GameModel(row));
    } catch (error) {
      console.error('Error in GameRepository.search:', error);
      throw error;
    }
  }

  /**
   * Create a new game
   * @param {Object} gameData - Game data
   * @returns {Promise<Object>} Created game object
   */
  static async create(gameData) {
    const { title, price, image_url, description, genre, region, release_date, rating } = gameData;
    try {
      const result = await pool.query(
        `INSERT INTO games (title, price, image_url, description, genre, region, release_date, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [title, price, image_url, description, genre, region, release_date, rating]
      );
      return new GameModel(result.rows[0]);
    } catch (error) {
      console.error('Error in GameRepository.create:', error);
      throw error;
    }
  }

  /**
   * Get a game by ID
   * @param {number} id - Game ID
   * @returns {Promise<Object|null>} Game object or null if not found
   */
  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
      return result.rows[0] ? new GameModel(result.rows[0]) : null;
    } catch (error) {
      console.error('Error in GameRepository.getById:', error);
      throw error;
    }
  }

  /**
   * Update a game
   * @param {number} id - Game ID
   * @param {Object} gameData - Updated game data
   * @returns {Promise<Object|null>} Updated game object or null if not found
   */
  static async update(id, gameData) {
    const { title, price, image_url, description, genre, release_date, rating } = gameData;
    try {
      const result = await pool.query(
        `UPDATE games 
         SET title = $1, price = $2, image_url = $3, description = $4, 
             genre = $5, release_date = $6, rating = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8 
         RETURNING *`,
        [title, price, image_url, description, genre, release_date, rating, id]
      );
      return result.rows[0] ? new GameModel(result.rows[0]) : null;
    } catch (error) {
      console.error('Error in GameRepository.update:', error);
      throw error;
    }
  }

  /**
   * Delete a game
   * @param {number} id - Game ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING id', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error in GameRepository.delete:', error);
      throw error;
    }
  }
}

module.exports = GameRepository;
