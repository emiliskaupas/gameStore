/**
 * Game Model (Entity)
 * Represents the game data structure
 */
class GameModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.image_url = data.image_url;
    this.description = data.description;
    this.genre = data.genre;
    this.region = data.region;
    this.release_date = data.release_date;
    this.rating = data.rating;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  /**
   * Convert to JSON representation
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      image_url: this.image_url,
      description: this.description,
      genre: this.genre,
      region: this.region,
      release_date: this.release_date,
      rating: this.rating,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  /**
   * Validate model data and return errors if any
   */
  validate() {
    const errors = [];
    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      errors.push('Title is required and must be a non-empty string.');
    }
    if (this.price === undefined || this.price === null || isNaN(this.price)) {
      errors.push('Price is required and must be a valid number.');
    } else if (this.price < 0) {
      errors.push('Price cannot be negative.');
    }
    if (this.rating !== undefined && this.rating !== null) {
      if (isNaN(this.rating) || this.rating < 0 || this.rating > 5) {
        errors.push('Rating must be a number between 0 and 5.');
      }
    }
    if (this.description && typeof this.description === 'string' && this.description.length > 1000) {
      errors.push('Description cannot be longer than 1000 characters.');
    }
    if (this.release_date) {
      const date = new Date(this.release_date);
      if (isNaN(date.getTime())) {
        errors.push('Release date must be a valid date.');
      }
    }
    return errors;
  }
}

module.exports = GameModel;
