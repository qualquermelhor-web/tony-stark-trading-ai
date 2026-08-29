/**
 * Random Joke Generator
 * Fetches funny jokes from an external API
 */

const axios = require('axios');

class JokeGenerator {
  constructor() {
    // Using JokeAPI - free and doesn't require authentication
    this.jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any';
    this.dadJokeApiUrl = 'https://icanhazdadjoke.com/';
  }

  /**
   * Fetch a random joke from JokeAPI
   * @returns {Promise<string>} A formatted joke
   */
  async getRandomJoke() {
    try {
      const response = await axios.get(this.jokeApiUrl, {
        params: {
          format: 'json',
          type: 'single' // Returns single-line jokes only
        }
      });

      if (response.data.error) {
        throw new Error('Failed to fetch joke');
      }

      return response.data.joke;
    } catch (error) {
      console.error('Error fetching joke:', error.message);
      return this.getFallbackJoke();
    }
  }

  /**
   * Fetch a random dad joke
   * @returns {Promise<string>} A dad joke
   */
  async getDadJoke() {
    try {
      const response = await axios.get(this.dadJokeApiUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      return response.data.joke;
    } catch (error) {
      console.error('Error fetching dad joke:', error.message);
      return this.getFallbackJoke();
    }
  }

  /**
   * Get a random joke by category (requires type parameter)
   * @param {string} category - Joke category (Programming, Knock-Knock, General, Dark, Spooky, Christmas)
   * @returns {Promise<string>} A joke from the specified category
   */
  async getJokeByCategory(category = 'General') {
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);

      if (response.data.error) {
        throw new Error('Category not found');
      }

      const joke = response.data.type === 'single' 
        ? response.data.joke 
        : `${response.data.setup}\n${response.data.delivery}`;

      return joke;
    } catch (error) {
      console.error(`Error fetching ${category} joke:`, error.message);
      return this.getFallbackJoke();
    }
  }

  /**
   * Fallback jokes in case API calls fail
   * @returns {string} A random fallback joke
   */
  getFallbackJoke() {
    const fallbackJokes = [
      'Why did the programmer quit his job? Because he didn\'t get arrays.',
      'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
      'Why do Java developers wear glasses? Because they don\'t C#.',
      'Why did the developer go broke? Because he used up all his cache.',
      'How do you know you\'re a real programmer? When you confuse Halloween and Christmas because Oct 31 equals Dec 25.'
    ];

    return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
  }

  /**
   * Get multiple random jokes
   * @param {number} count - Number of jokes to fetch
   * @returns {Promise<Array>} Array of jokes
   */
  async getMultipleJokes(count = 5) {
    const jokes = [];
    for (let i = 0; i < count; i++) {
      try {
        const joke = await this.getRandomJoke();
        jokes.push(joke);
      } catch (error) {
        console.error(`Error fetching joke ${i + 1}:`, error.message);
      }
    }
    return jokes;
  }
}

// Export for use in other modules
module.exports = JokeGenerator;

// Example usage
if (require.main === module) {
  const generator = new JokeGenerator();

  (async () => {
    console.log('🎭 Random Joke Generator\n');
    
    console.log('📍 Random Joke:');
    const randomJoke = await generator.getRandomJoke();
    console.log(randomJoke);
    
    console.log('\n😄 Dad Joke:');
    const dadJoke = await generator.getDadJoke();
    console.log(dadJoke);
    
    console.log('\n💻 Programming Joke:');
    const progJoke = await generator.getJokeByCategory('Programming');
    console.log(progJoke);
    
    console.log('\n🎪 Multiple Jokes (3):');
    const multipleJokes = await generator.getMultipleJokes(3);
    multipleJokes.forEach((joke, index) => {
      console.log(`${index + 1}. ${joke}`);
    });
  })();
}
