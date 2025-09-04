import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ReactNode } from 'react';

/**
 * DragDropContainer Component
 * 
 * This component provides drag and drop functionality using react-beautiful-dnd.
 * It wraps child components in the necessary context providers and handlers for drag and drop operations.
 * 
 * Requirements:
 * - Must be used with draggable children components
 * - Parent component must handle the onDragEnd logic
 * - Each container must have a unique droppableId
 * 
 * @example
 * ```tsx
 * <DragDropContainer 
 *   droppableId="minerals-list"
 *   onDragEnd={handleDragEnd}
 *   className="space-y-2"
 * >
 *   {minerals.map((mineral, index) => (
 *     <DraggableItem key={mineral.id} index={index} id={mineral.id}>
 *       <MineralCard mineral={mineral} />
 *     </DraggableItem>
 *   ))}
 * </DragDropContainer>
 * ```
 */

/**
 * Props interface for the DragDropContainer component
 * @interface DragDropContainerProps
 * @property {ReactNode} children - The draggable content to be rendered inside the container
 * @property {Function} onDragEnd - Callback function that handles the end of a drag operation
 * @property {string} droppableId - Unique identifier for the droppable area
 * @property {string} [className] - Optional CSS classes to apply to the container
 */
interface DragDropContainerProps {
  children: ReactNode;
  onDragEnd: (result: DropResult) => void;
  droppableId: string;
  className?: string;
}

/**
 * DragDropContainer component that enables drag and drop functionality
 * 
 * @component
 * @param {DragDropContainerProps} props - Component props
 * @returns {JSX.Element} A container with drag and drop capabilities
 */
export const DragDropContainer = ({ 
  children, 
  onDragEnd, 
  droppableId, 
  className = '' 
}: DragDropContainerProps) => {
  return (
    // DragDropContext provides the drag and drop functionality to its children
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Droppable defines an area where items can be dropped */}
      <Droppable droppableId={droppableId}>
        {/* Render props pattern - provides drag state and refs */}
        {(provided, snapshot) => (
          <div
            // Ref and props required for drag and drop functionality
            ref={provided.innerRef}
            {...provided.droppableProps}
            // Dynamic classes for styling - adds background when dragging over
            className={`${className} ${snapshot.isDraggingOver ? 'bg-muted/50' : ''} transition-colors duration-200`}
          >
            {/* Render children (should be Draggable components) */}
            {children}
            {/* Placeholder maintains layout during drag operations */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
