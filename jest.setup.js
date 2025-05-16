// Change import to require for Jest CommonJS compatibility
require('@testing-library/jest-dom');

// Polyfill TextEncoder and TextDecoder for Jest (Node < 18 or missing globals)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
