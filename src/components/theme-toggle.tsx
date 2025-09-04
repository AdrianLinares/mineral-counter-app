import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

/**
 * ThemeToggle Component
 * 
 * A button component that cycles between light, dark, and system theme modes.
 * Features smooth transitions, animations, and accessible tooltips.
 * 
 * Theme Cycle Order:
 * light -> dark -> system -> light
 * 
 * @component
 */
export function ThemeToggle() {
  // Get theme state and setter from next-themes
  const { theme, setTheme } = useTheme()
  
  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  // State to track theme change animation
  const [isChanging, setIsChanging] = useState(false)

  /**
   * Effect to handle component mounting
   * Prevents hydration mismatch between server and client
   */
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Handles theme cycling and animation
   * Adds a brief animation when changing themes
   */
  const toggleTheme = () => {
    // Start change animation
    setIsChanging(true)
    // Reset animation after 300ms (matches CSS transition)
    setTimeout(() => setIsChanging(false), 300)
    
    // Cycle through themes: light -> dark -> system -> light
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  /**
   * Determines which icon to show based on current theme
   * Includes animation classes for smooth transitions
   * @returns {JSX.Element} The icon component to display
   */
  const getIcon = () => {
    // Show default icon before mounting to prevent hydration mismatch
    if (!mounted) return <Monitor className="h-4 w-4" />
    
    // Common animation classes for icons
    const iconClass = `h-4 w-4 transition-all duration-300 ${
      isChanging ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
    }`
    
    // Return appropriate icon based on current theme
    switch (theme) {
      case "light":
        return <Sun className={iconClass} />
      case "dark":
        return <Moon className={iconClass} />
      case "system":
        return <Monitor className={iconClass} />
      default:
        return <Monitor className={iconClass} />
    }
  }

  /**
   * Gets the tooltip text for the next theme state
   * @returns {string} Tooltip text in Spanish
   */
  const getTooltipText = () => {
    switch (theme) {
      case "light":
        return "Cambiar a modo oscuro"
      case "dark":
        return "Cambiar a modo sistema"
      case "system":
        return "Cambiar a modo claro"
      default:
        return "Cambiar tema"
    }
  }

  /**
   * Gets the current theme status text
   * @returns {string} Current theme status in Spanish
   */
  const getThemeStatus = () => {
    switch (theme) {
      case "light":
        return "Modo claro activo"
      case "dark":
        return "Modo oscuro activo"
      case "system":
        return "Modo sistema activo"
      default:
        return "Modo sistema activo"
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={`${getThemeStatus()} - ${getTooltipText()}`}
      className={`theme-toggle relative transition-all duration-300 
        hover:scale-105 hover:bg-accent/50 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        ${isChanging ? 'bg-accent/30' : ''}`}
      aria-label={`${getThemeStatus()} - ${getTooltipText()}`}
    >
      {/* Icon container with animation overlay */}
      <div className="relative flex items-center justify-center">
        {getIcon()}
        {/* Pulse animation overlay during theme change */}
        {isChanging && (
          <div className="absolute inset-0 rounded-md bg-primary/10 animate-pulse" />
        )}
      </div>
      {/* Screen reader text */}
      <span className="sr-only">
        {getThemeStatus()} - {getTooltipText()}
      </span>
    </Button>
  )
}
