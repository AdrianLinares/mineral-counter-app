/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application.
 * It sets up the root component and injects it into the DOM.
 * 
 * Key Concepts:
 * 1. React 18 createRoot API
 * 2. DOM mounting
 * 3. Global styles
 */

// Import required dependencies
import { createRoot } from 'react-dom/client';
// Import the main App component
import App from './App.tsx';
// Import global styles
import './index.css';

/**
 * Application Initialization
 * 
 * 1. Find the root DOM element with id 'root'
 * 2. Create a React root using createRoot
 * 3. Render the App component into the root
 * 
 * The '!' is a TypeScript non-null assertion operator
 * telling TypeScript that we're sure getElementById won't return null
 */
createRoot(document.getElementById('root')!).render(
  // Render the main App component
  <App />
);

/**
 * Important Notes for Junior Developers:
 * 
 * 1. This file needs a corresponding HTML file with a <div id="root"></div>
 * 
 * 2. The index.css import brings in global styles including:
 *    - Tailwind CSS utilities
 *    - Custom theme variables
 *    - Global style resets
 * 
 * 3. Error handling:
 *    If 'root' element is not found, the app will throw an error
 *    In production, you might want to add error boundaries
 * 
 * 4. React 18+ Features:
 *    - createRoot replaces older ReactDOM.render
 *    - Enables concurrent features
 *    - Better error handling
 *    - Automatic batching of state updates
 * 
 * Example index.html:
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <title>Mineral Counter App</title>
 *   </head>
 *   <body>
 *     <div id="root"></div>
 *   </body>
 * </html>
 */
