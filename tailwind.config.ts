/**
 * Tailwind CSS Configuration
 * 
 * This file configures Tailwind CSS for the Mineral Counter application.
 * It defines custom theme settings, animations, and responsive design breakpoints.
 */

import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssAspectRatio from "@tailwindcss/aspect-ratio";

/**
 * Tailwind Configuration Object
 * Exports a complete configuration for Tailwind CSS with custom theme settings
 */
export default {
  // Enable dark mode using class strategy (instead of media queries)
  darkMode: ["class"],
  
  // Define which files Tailwind should scan for classes
  content: [
    "./pages/**/*.{ts,tsx}",    // Pages directory
    "./components/**/*.{ts,tsx}", // Components directory
    "./app/**/*.{ts,tsx}",      // App directory
    "./src/**/*.{ts,tsx}",      // Source directory
  ],

  // No prefix for utility classes
  prefix: "",

  // Theme customization
  theme: {
    // Container settings
    container: {
      center: true,              // Center containers by default
      padding: "2rem",          // Default padding
      screens: {
        "2xl": "1400px",        // Max width for 2xl screens
      },
    },

    // Theme extensions
    extend: {
      // Custom color system using CSS variables
      colors: {
        // Base UI colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary color and variants
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Secondary color and variants
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Destructive/Error colors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Muted/Subtle colors
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Accent colors
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover/Dialog colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Card colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Sidebar-specific colors
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      // Custom border radius using CSS variables
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Animation keyframes
      keyframes: {
        // Accordion open animation
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        // Accordion close animation
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      // Named animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  // Plugins
  plugins: [
    tailwindcssAnimate,         // Adds animation utilities
    tailwindcssAspectRatio,     // Adds aspect ratio utilities
  ],
} satisfies Config;
