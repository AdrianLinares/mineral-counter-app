import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Target, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MATURITY_DATABASE, MaturityTerm } from '@/types/mineral';

/**
 * Interface for the MaturitySelector component props
 * @interface MaturitySelectorProps
 * @property {Object} currentMaturity - Currently selected maturity (optional)
 * @property {string} currentMaturity.term - Name of the maturity level
 * @property {string} currentMaturity.description - Description of the maturity level
 * @property {Function} onSelect - Callback function called when a maturity level is selected
 * @property {Function} onClear - Callback function called when the selection is cleared
 */
interface MaturitySelectorProps {
  currentMaturity?: {
    term: string;
    description: string;
  };
  onSelect: (maturity: { term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * MaturitySelector Component
 * 
 * A dialog-based selector for choosing textural maturity levels in geological studies.
 * Features search functionality and clear selection option.
 * 
 * @component
 * @example
 * ```tsx
 * <MaturitySelector
 *   currentMaturity={selectedMaturity}
 *   onSelect={(maturity) => handleMaturitySelection(maturity)}
 *   onClear={() => clearMaturitySelection()}
 * />
 * ```
 */
export const MaturitySelector = ({ 
  currentMaturity, 
  onSelect, 
  onClear 
}: MaturitySelectorProps) => {
  // State for controlling dialog visibility
  const [open, setOpen] = useState(false);
  // State for managing search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filters maturity levels based on search term
   * Searches in both term and description fields
   */
  const filteredMaturity = MATURITY_DATABASE.madurez_textural.filter(maturity =>
    maturity.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maturity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles the selection of a maturity level
   * @param {MaturityTerm} maturity - The selected maturity level
   */
  const handleSelect = (maturity: MaturityTerm) => {
    onSelect({
      term: maturity.term,
      description: maturity.description
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
      {/* Button that triggers the dialog - shows current selection or placeholder */}
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-between text-left font-normal"
        >
          {/* Button content with icon and text */}
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {currentMaturity ? (
              <span className="truncate">{currentMaturity.term}</span>
            ) : (
              <span className="text-muted-foreground">Madurez textural</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      {/* Dialog content */}
      <DialogContent className="max-w-2xl max-h-[80vh]">
        {/* Dialog header with title */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Seleccionar Madurez Textural
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
                placeholder="Buscar madurez textural..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Clear button - only shown when there's a selection */}
            {currentMaturity && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Scrollable area with maturity levels list */}
          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Grados de Madurez Textural
              </h3>
              {/* Map through filtered maturity levels */}
              {filteredMaturity.map((maturity, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(maturity)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{maturity.term}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {maturity.description}
                      </div>
                    </div>
                    {/* Show badge for currently selected maturity */}
                    {currentMaturity?.term === maturity.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {/* No results message */}
              {filteredMaturity.length === 0 && (
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
