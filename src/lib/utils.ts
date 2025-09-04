import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility Functions for Class Name Management
 *
 * This module provides utilities for handling CSS class names in a React application,
 * specifically designed to work with Tailwind CSS.
 */

/**
 * Combines and merges CSS class names efficiently
 *
 * This function combines multiple class names or conditional classes and merges
 * Tailwind CSS classes intelligently to prevent conflicts and duplicates.
 *
 * Features:
 * - Merges Tailwind classes intelligently
 * - Handles conditional classes
 * - Supports array and object syntax
 * - Removes conflicting classes
 *
 * @param {...ClassValue[]} inputs - Class names to combine. Can be:
 *   - Strings: "bg-red-500 text-white"
 *   - Arrays: ["bg-red-500", "text-white"]
 *   - Objects: { "bg-red-500": true, "hidden": false }
 *   - Or any combination of these
 *
 * @returns {string} A merged string of class names
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn("bg-red-500", "text-white")
 * // => "bg-red-500 text-white"
 *
 * // With conditions
 * cn("bg-red-500", isActive && "text-white")
 * // => "bg-red-500 text-white" (if isActive is true)
 * // => "bg-red-500" (if isActive is false)
 *
 * // With Tailwind class merging
 * cn("px-2 py-1", "py-2")
 * // => "px-2 py-2" (py-2 overrides py-1)
 *
 * // With dynamic classes
 * cn({
 *   "bg-red-500": isError,
 *   "bg-green-500": isSuccess
 * })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Understanding the Code
 *
 * ### Purpose
 * This utility helps manage CSS classes in a React application, particularly when using Tailwind CSS. It solves several common problems:
 * 1. Combining multiple class names
 * 2. Handling conditional classes
 * 3. Merging Tailwind classes intelligently
 * 4. Removing conflicts and duplicates
 *
 * ### Key Components
 *
 * 1. **clsx**
 *    - A utility for constructing className strings
 *    - Handles conditional and dynamic classes
 *    - Supports various input types (strings, arrays, objects)
 *
 * 2. **tailwind-merge**
 *    - Intelligently merges Tailwind CSS classes
 *    - Prevents conflicts between utility classes
 *    - Maintains the proper order of classes
 *
 * ### Common Use Cases
 *
 * 1. **Basic Class Combination**
 * ```tsx
 * const className = cn(
 *   "base-class",
 *   "additional-class"
 * );
 * ```
 *
 * 2. **Conditional Classes**
 * ```tsx
 * const className = cn(
 *   "base-class",
 *   isActive && "active-class",
 *   isBig ? "text-lg" : "text-sm"
 * );
 * ```
 *
 * 3. **With Tailwind Classes**
 * ```tsx
 * const className = cn(
 *   "p-4 bg-blue-500",
 *   isLarge && "p-6", // Will override p-4
 *   isDark && "bg-blue-700" // Will override bg-blue-500
 * );
 * ```
 *
 * 4. **With Dynamic Objects**
 * ```tsx
 * const className = cn({
 *   "bg-red-500": isError,
 *   "bg-green-500": isSuccess,
 *   "bg-blue-500": isInfo,
 *   "p-4": true
 * });
 * ```
 *
 * ### Best Practices
 * 1. Use for dynamic class combinations
 * 2. Prefer object syntax for multiple conditions
 * 3. Keep class strings readable
 * 4. Consider performance with large class lists
 * 5. Use with Tailwind's responsive classes
 */
