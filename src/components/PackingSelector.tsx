import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Package, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PACKING_DATABASE, PackingTerm } from '@/types/mineral';

/**
 * Props interface for the PackingSelector component
 * @interface PackingSelectorProps
 * @property {Object} currentPacking - Currently selected packing type (optional)
 * @property {string} currentPacking.term - Name of the packing type
 * @property {string} currentPacking.description - Description of the packing type
 * @property {Function} onSelect - Callback function when a packing type is selected
 * @property {Function} onClear - Callback function when the selection is cleared
 */
interface PackingSelectorProps {
  currentPacking?: {
    term: string;
    description: string;
  };
  onSelect: (packing: { term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * PackingSelector Component
 * 
 * A dialog-based selector for choosing packing types in geological studies.
 * Features include:
 * - Search functionality for packing types
 * - Clear selection option
 * - Visual feedback for selected item
 * - Scrollable list with descriptions
 * 
 * @component
 * @example
 * ```tsx
 * <PackingSelector
 *   currentPacking={selectedPacking}
 *   onSelect={(packing) => handlePackingSelection(packing)}
 *   onClear={() => clearPackingSelection()}
 * />
 * ```
 */
export const PackingSelector = ({ 
  currentPacking, 
  onSelect, 
  onClear 
}: PackingSelectorProps) => {
  // State for dialog visibility
  const [open, setOpen] = useState(false);
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filters the packing types based on search term
   * Searches in both term and description fields
   * Case-insensitive search
   */
  const filteredPacking = (PACKING_DATABASE.empaquetamiento ?? []).filter(packing =>
    packing.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    packing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles the selection of a packing type
   * Updates the selection, closes the dialog and resets search
   * @param {PackingTerm} packing - The selected packing type
   */
  const handleSelect = (packing: PackingTerm) => {
    onSelect({
      term: packing.term,
      description: packing.description
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
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {/* Shows either selected packing or placeholder text */}
            {currentPacking ? (
              <span className="truncate">{currentPacking.term}</span>
            ) : (
              <span className="text-muted-foreground">Empaquetamiento</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      {/* Dialog content with search and selection options */}
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Seleccionar Empaquetamiento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and clear button section */}
          <div className="flex items-center gap-2">
            {/* Search input with icon */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empaquetamiento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Clear button - only shown when there's a selection */}
            {currentPacking && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Scrollable area with packing types list */}
          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Tipos de Empaquetamiento
              </h3>
              {/* Map through filtered packing types */}
              {filteredPacking.map((packing, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(packing)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{packing.term}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {packing.description}
                      </div>
                    </div>
                    {/* Show badge for currently selected packing */}
                    {currentPacking?.term === packing.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {/* No results message */}
              {filteredPacking.length === 0 && (
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
