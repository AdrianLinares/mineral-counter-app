import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsChanging(true)
    setTimeout(() => setIsChanging(false), 300) // Match CSS transition duration
    
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />
    
    const iconClass = `h-4 w-4 transition-all duration-300 ${isChanging ? 'scale-110 rotate-180' : 'scale-100 rotate-0'}`
    
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
      className={`theme-toggle relative transition-all duration-300 hover:scale-105 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        isChanging ? 'bg-accent/30' : ''
      }`}
      aria-label={`${getThemeStatus()} - ${getTooltipText()}`}
    >
      <div className="relative flex items-center justify-center">
        {getIcon()}
        {isChanging && (
          <div className="absolute inset-0 rounded-md bg-primary/10 animate-pulse" />
        )}
      </div>
      <span className="sr-only">{getThemeStatus()} - {getTooltipText()}</span>
    </Button>
  )
}
