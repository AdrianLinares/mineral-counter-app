import { Draggable } from 'react-beautiful-dnd';
import { CounterCard } from './CounterCard';
import { Counter } from '@/types/mineral';
import { GripVertical } from 'lucide-react';

/**
 * DraggableCounterCard Component
 * 
 * This component wraps the CounterCard component with drag and drop functionality.
 * It adds a drag handle and visual feedback during drag operations.
 * 
 * @component
 * @requires react-beautiful-dnd
 * @requires lucide-react
 */

/**
 * Props interface for the DraggableCounterCard component
 * @interface DraggableCounterCardProps
 * @extends {Omit<CounterCardProps, 'className'>}
 * @property {Counter} counter - The counter object containing mineral data
 * @property {number} index - Position index in the list (required for drag and drop)
 * @property {Function} onIncrement - Callback to increase counter value
 * @property {Function} onDecrement - Callback to decrease counter value
 * @property {Function} onReset - Callback to reset counter to zero
 * @property {Function} onDelete - Callback to remove the counter
 * @property {Function} onUpdate - Callback to update counter properties
 * @property {'individual' | 'grid' | 'list'} viewMode - Display mode for the counter
 * @property {boolean} [isDragEnabled=true] - Whether dragging is enabled for this card
 */
interface DraggableCounterCardProps {
  counter: Counter;
  index: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Counter>) => void;
  viewMode: 'individual' | 'grid' | 'list';
  isDragEnabled?: boolean;
}

/**
 * A draggable wrapper for CounterCard component
 * 
 * @example
 * ```tsx
 * <DraggableCounterCard
 *   counter={mineralCounter}
 *   index={0}
 *   onIncrement={() => handleIncrement(mineralCounter.id)}
 *   onDecrement={() => handleDecrement(mineralCounter.id)}
 *   onReset={() => handleReset(mineralCounter.id)}
 *   onDelete={() => handleDelete(mineralCounter.id)}
 *   onUpdate={(updates) => handleUpdate(mineralCounter.id, updates)}
 *   viewMode="grid"
 * />
 * ```
 */
export const DraggableCounterCard = ({
  counter,
  index,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  onUpdate,
  viewMode,
  isDragEnabled = true
}: DraggableCounterCardProps) => {
  return (
    // Draggable component from react-beautiful-dnd
    <Draggable
      draggableId={counter.id} // Unique identifier for the draggable item
      index={index} // Position in the list
      isDragDisabled={!isDragEnabled} // Controls whether the item can be dragged
    >
      {/* Render props pattern providing drag state and refs */}
      {(provided, snapshot) => (
        <div
          // Required setup for drag functionality
          ref={provided.innerRef}
          {...provided.draggableProps}
          // Classes for styling and drag state
          className={`relative draggable-item ${
            snapshot.isDragging ? 'dragging z-50' : ''
          }`}
        >
          {/* Drag handle - Only visible in grid and list views */}
          {isDragEnabled && viewMode !== 'individual' && (
            <div
              {...provided.dragHandleProps}
              className="drag-handle absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing"
              title="Arrastra para reordenar"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          
          {/* Card wrapper with drag animation effects */}
          <div
            className={`${
              snapshot.isDragging 
                ? 'transform rotate-2 shadow-2xl ring-2 ring-primary/20' // Visual feedback during drag
                : ''
            } transition-all duration-200`}
          >
            {/* The actual counter card component */}
            <CounterCard
              counter={counter}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onReset={onReset}
              onDelete={onDelete}
              onUpdate={onUpdate}
              viewMode={viewMode}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
