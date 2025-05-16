// This file is used to resolve module dependencies for Strapi Cloud
const path = require('path');
const fs = require('fs');
const Module = require('module');

// Store the original require function
const originalRequire = Module.prototype.require;

// Override the require function to handle missing modules
Module.prototype.require = function(id) {
  try {
    // Try the original require first
    return originalRequire.call(this, id);
  } catch (error) {
    // If the module is lodash/fp, use our custom implementation
    if (id === 'lodash/fp') {
      console.log('Using custom lodash/fp implementation');
      return require('./src/utils/lodash-fp');
    }
    
    // For other modules, rethrow the error
    throw error;
  }
};

// Log that the module resolver has been loaded
console.log('Custom module resolver loaded');
