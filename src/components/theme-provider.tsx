"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider Component
 * 
 * This component wraps the application to provide theme functionality using next-themes.
 * It enables dark/light mode switching and theme persistence.
 * 
 * Features:
 * - Automatic theme detection
 * - Theme persistence across page reloads
 * - System theme synchronization
 * - SSR support
 * 
 * @component
 * @param {ThemeProviderProps} props - Props from next-themes
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @param {string} [props.defaultTheme="system"] - Default theme to use
 * @param {string[]} [props.themes] - Available themes
 * @param {boolean} [props.enableSystem=true] - Enable system theme detection
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // With custom options
 * <ThemeProvider 
 *   defaultTheme="dark"
 *   themes={['light', 'dark', 'custom']}
 *   enableSystem={false}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
