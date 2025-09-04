/**
 * Main Application Component
 * 
 * This is the root component that sets up all the necessary providers and routing
 * for the mineral counter application. It wraps the entire application with required
 * context providers and routing configuration.
 * 
 * Key Features:
 * - React Query for data management
 * - Theme management (light/dark/system)
 * - Toast notifications
 * - Tooltips
 * - Client-side routing
 */

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

/**
 * Create a new Query Client instance
 * This manages all the data fetching and caching in the application
 */
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Provides the application with:
 * 1. Data fetching capabilities (React Query)
 * 2. Theme management
 * 3. Tooltip functionality
 * 4. Toast notifications
 * 5. Client-side routing
 * 
 * The component hierarchy (from outside to inside) is:
 * QueryClientProvider -> ThemeProvider -> TooltipProvider -> Routing
 * 
 * @returns {JSX.Element} The configured application wrapper
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Theme Provider - Manages light/dark mode */}
    <ThemeProvider
      attribute="class" // Uses class attribute for theme
      defaultTheme="system" // Default to system preferences
      enableSystem // Allow system theme detection
      disableTransitionOnChange={false} // Enable smooth transitions
      storageKey="mineral-counter-theme" // Local storage key
    >
      {/* Tooltip Provider - Manages all tooltips */}
      <TooltipProvider>
        {/* Toast notifications component */}
        <Toaster />
        
        {/* Router setup */}
        <BrowserRouter>
          <Routes>
            {/* Main application route */}
            <Route path="/" element={<Index />} />
            {/* 404 page for unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
