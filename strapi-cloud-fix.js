// This script fixes common issues with Strapi Cloud deployment
const fs = require('fs');
const path = require('path');

console.log('Running Strapi Cloud fix script...');

// Fix PostCSS configuration
try {
  const postcssConfigPath = path.join(__dirname, 'postcss.config.js');
  
  // Create a simple PostCSS config that doesn't rely on external dependencies
  const postcssConfig = `
module.exports = {
  plugins: []
}
`;
  
  fs.writeFileSync(postcssConfigPath, postcssConfig);
  console.log('PostCSS configuration fixed successfully');
} catch (error) {
  console.error('Error fixing PostCSS configuration:', error);
}

console.log('Strapi Cloud fix script completed');
