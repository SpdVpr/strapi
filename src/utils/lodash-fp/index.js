// This is a custom implementation of lodash/fp to fix the Strapi Cloud deployment issue
// It exports the main lodash module as a fallback

try {
  // Try to require the real lodash/fp module
  module.exports = require('lodash/fp');
} catch (error) {
  // If that fails, export the main lodash module as a fallback
  console.warn('Warning: Using fallback lodash/fp implementation');
  module.exports = require('lodash');
}
