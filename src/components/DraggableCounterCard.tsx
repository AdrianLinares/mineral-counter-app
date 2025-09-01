import { Draggable } from 'react-beautiful-dnd';
import { CounterCard } from './CounterCard';
import { Counter } from '@/types/mineral';
import { GripVertical } from 'lucide-react';

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
    <Draggable
      draggableId={counter.id}
      index={index}
      isDragDisabled={!isDragEnabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`relative draggable-item ${
            snapshot.isDragging ? 'dragging z-50' : ''
          }`}
        >
          {/* Drag handle - only show in grid and list views */}
          {isDragEnabled && viewMode !== 'individual' && (
            <div
              {...provided.dragHandleProps}
              className="drag-handle absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing"
              title="Arrastra para reordenar"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          
          <div
            className={`${
              snapshot.isDragging 
                ? 'transform rotate-2 shadow-2xl ring-2 ring-primary/20' 
                : ''
            } transition-all duration-200`}
          >
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
