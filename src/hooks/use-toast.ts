import * as React from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

/**
 * Maximum number of toasts that can be shown at once
 */
const TOAST_LIMIT = 1;

/**
 * Delay in milliseconds before a toast is automatically removed
 */
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Type definition for a toast notification
 * Extends ToastProps with additional properties
 */
type ToasterToast = ToastProps & {
  id: string;                    // Unique identifier for the toast
  title?: React.ReactNode;       // Optional toast title
  description?: React.ReactNode; // Optional toast description
  action?: ToastActionElement;   // Optional action button
};

/**
 * Available action types for toast state management
 */
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',         // Add a new toast
  UPDATE_TOAST: 'UPDATE_TOAST',   // Update existing toast
  DISMISS_TOAST: 'DISMISS_TOAST', // Hide toast
  REMOVE_TOAST: 'REMOVE_TOAST',   // Remove toast from DOM
} as const;

/**
 * Counter for generating unique toast IDs
 */
let count = 0;

/**
 * Generates a unique ID for each toast
 * @returns {string} Unique identifier
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Type definitions for toast actions
 */
type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

/**
 * Interface for toast state
 */
interface State {
  toasts: ToasterToast[];
}

/**
 * Map to store timeout IDs for toast removal
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast to the removal queue
 * @param {string} toastId - ID of toast to remove
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Reducer function for managing toast state
 * Handles adding, updating, dismissing and removing toasts
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      // Add new toast to beginning of list, respect TOAST_LIMIT
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      // Update existing toast properties
      return {
        ...state,
        toasts: state.toasts.map((t) => 
          (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // Add toast(s) to removal queue
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Mark toast(s) as closed
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST':
      // Remove specific toast or all toasts
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

/**
 * Array of state change listeners
 */
const listeners: Array<(state: State) => void> = [];

/**
 * In-memory state storage
 */
let memoryState: State = { toasts: [] };

/**
 * Dispatches actions to update toast state
 * @param {Action} action - Action to dispatch
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Type for creating new toasts (omits id as it's generated)
 */
type Toast = Omit<ToasterToast, 'id'>;

/**
 * Creates and shows a new toast notification
 * @param {Toast} props - Toast properties
 * @returns Object with toast ID and control functions
 */
function toast({ ...props }: Toast) {
  const id = genId();

  // Functions to control the toast
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  // Add the new toast
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * Custom hook for using toasts in components
 * @returns Object with toast state and control functions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast()
 *   
 *   const showToast = () => {
 *     toast({
 *       title: "Success",
 *       description: "Operation completed"
 *     })
 *   }
 *   
 *   return <button onClick={showToast}>Show Toast</button>
 * }
 * ```
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  // Subscribe to state changes
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { useToast, toast };
