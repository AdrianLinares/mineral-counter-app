import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ArrowUpDown, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SORTING_DATABASE, SortingTerm } from '@/types/mineral';

/**
 * Props interface for the SortingSelector component
 * @interface SortingSelectorProps
 * @property {Object} currentSorting - Currently selected sorting grade (optional)
 * @property {string} currentSorting.term - Name of the sorting grade
 * @property {string} currentSorting.description - Description of the sorting grade
 * @property {Function} onSelect - Callback function when a sorting grade is selected
 * @property {Function} onClear - Callback function when the selection is cleared
 */
interface SortingSelectorProps {
  currentSorting?: {
    term: string;
    description: string;
  };
  onSelect: (sorting: { term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * SortingSelector Component
 * 
 * A dialog-based selector for choosing grain sorting grades in geological studies.
 * Features include:
 * - Search functionality for sorting grades
 * - Clear selection option
 * - Visual feedback for selected item
 * - Scrollable list with descriptions
 * 
 * @component
 * @example
 * ```tsx
 * <SortingSelector
 *   currentSorting={selectedSorting}
 *   onSelect={(sorting) => handleSortingSelection(sorting)}
 *   onClear={() => clearSortingSelection()}
 * />
 * ```
 */
export const SortingSelector = ({ 
  currentSorting, 
  onSelect, 
  onClear 
}: SortingSelectorProps) => {
  // State for dialog visibility
  const [open, setOpen] = useState(false);
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filters the sorting grades based on search term
   * Searches in both term and description fields
   * Case-insensitive search
   */
  const filteredSorting = SORTING_DATABASE.sorteo.filter(sorting =>
    sorting.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sorting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles the selection of a sorting grade
   * Updates the selection, closes the dialog and resets search
   * @param {SortingTerm} sorting - The selected sorting grade
   */
  const handleSelect = (sorting: SortingTerm) => {
    onSelect({
      term: sorting.term,
      description: sorting.description
    });
    setOpen(false);
    setSearchTerm('');
  };

  /**
   * Handles clearing the current selection
   * Calls onClear callback and closes the dialog
   */
  const handleClear = () => {
    onClear();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button that shows current selection or placeholder */}
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-between text-left font-normal"
        >
          {/* Button content with icon and text */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            {/* Shows either selected sorting or placeholder text */}
            {currentSorting ? (
              <span className="truncate">{currentSorting.term}</span>
            ) : (
              <span className="text-muted-foreground">Sorteo</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      {/* Dialog content with search and selection options */}
      <DialogContent className="max-w-2xl max-h-[80vh]">
        {/* Dialog header with title */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-blue-600" />
            Seleccionar Sorteo
          </DialogTitle>
        </DialogHeader>
        
        {/* Main content area */}
        <div className="space-y-4">
          {/* Search and clear button section */}
          <div className="flex items-center gap-2">
            {/* Search input with icon */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar sorteo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Clear button - only shown when there's a selection */}
            {currentSorting && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Scrollable area with sorting grades list */}
          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Grados de Sorteo
              </h3>
              {/* Map through filtered sorting grades */}
              {filteredSorting.map((sorting, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(sorting)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{sorting.term}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {sorting.description}
                      </div>
                    </div>
                    {/* Show badge for currently selected sorting */}
                    {currentSorting?.term === sorting.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {/* No results message */}
              {filteredSorting.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron resultados para "{searchTerm}"
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
