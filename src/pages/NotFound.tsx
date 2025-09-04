/**
 * NotFoundPage Component
 * 
 * A user-friendly 404 error page that is shown when a requested route doesn't exist.
 * Features a clean design with gradient background and responsive layout.
 * 
 * Features:
 * - Responsive design
 * - Gradient background
 * - Navigation options
 * - Accessible buttons
 * - Mobile-friendly layout
 * 
 * @component
 * @example
 * ```tsx
 * // This page is automatically rendered by Next.js when a route is not found
 * // No manual implementation needed
 * ```
 */

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    // Container with full viewport height, centered content and gradient background
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-center">
      {/* Content container with maximum width and vertical spacing */}
      <div className="space-y-6 max-w-md">
        {/* Error message section with vertical spacing */}
        <div className="space-y-3">
          {/* Large 404 heading with blue color */}
          <h1 className="text-8xl font-bold text-blue-600">404</h1>
          
          {/* Secondary heading explaining the error */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          
          {/* Descriptive text with muted color */}
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Navigation buttons container - stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Primary action - Return to home page */}
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
          
          {/* Secondary action - Go back to previous page */}
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
