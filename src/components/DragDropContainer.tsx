import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ReactNode } from 'react';

interface DragDropContainerProps {
  children: ReactNode;
  onDragEnd: (result: DropResult) => void;
  droppableId: string;
  className?: string;
}

export const DragDropContainer = ({ 
  children, 
  onDragEnd, 
  droppableId, 
  className = '' 
}: DragDropContainerProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${className} ${snapshot.isDraggingOver ? 'bg-muted/50' : ''} transition-colors duration-200`}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
