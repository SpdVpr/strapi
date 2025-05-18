// This script fixes common issues with Strapi Cloud deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Install lodash explicitly to fix the lodash/fp issue
try {
  console.log('Installing lodash...');
  execSync('npm install lodash@4.17.21 --no-save', { stdio: 'inherit' });
  console.log('Lodash installed successfully');

  // Create a symlink for lodash/fp if it doesn't exist
  const lodashPath = path.join(__dirname, 'node_modules', 'lodash');
  const lodashFpPath = path.join(lodashPath, 'fp');

  if (fs.existsSync(lodashPath) && !fs.existsSync(lodashFpPath)) {
    console.log('Creating symlink for lodash/fp...');
    // Check if the fp directory exists in the lodash package
    const lodashFpSourcePath = path.join(lodashPath, 'fp');
    if (!fs.existsSync(lodashFpSourcePath)) {
      // If not, create a simple module that exports lodash
      fs.mkdirSync(lodashFpPath, { recursive: true });
      fs.writeFileSync(path.join(lodashFpPath, 'index.js'), `
module.exports = require('lodash');
      `);
      console.log('Created lodash/fp module');
    }
  }
} catch (error) {
  console.error('Error installing lodash:', error);
}

console.log('Strapi Cloud fix script completed');
