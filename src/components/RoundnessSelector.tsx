import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, CornerDownLeft, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ROUNDNESS_DATABASE, RoundnessTerm } from '@/types/mineral';

/**
 * Props interface for the RoundnessSelector component
 * @interface RoundnessSelectorProps
 * @property {Object} currentRoundness - Currently selected roundness (optional)
 * @property {string} currentRoundness.term - Name of the roundness grade
 * @property {string} currentRoundness.description - Description of the roundness grade
 * @property {Function} onSelect - Callback function when a roundness grade is selected
 * @property {Function} onClear - Callback function when the selection is cleared
 */
interface RoundnessSelectorProps {
  currentRoundness?: {
    term: string;
    description: string;
  };
  onSelect: (roundness: { term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * RoundnessSelector Component
 * 
 * A dialog-based selector for choosing grain roundness grades in geological studies.
 * Features include:
 * - Search functionality for roundness grades
 * - Clear selection option
 * - Visual feedback for selected item
 * - Scrollable list with descriptions
 * 
 * @component
 * @example
 * ```tsx
 * <RoundnessSelector
 *   currentRoundness={selectedRoundness}
 *   onSelect={(roundness) => handleRoundnessSelection(roundness)}
 *   onClear={() => clearRoundnessSelection()}
 * />
 * ```
 */
export const RoundnessSelector = ({ 
  currentRoundness, 
  onSelect, 
  onClear 
}: RoundnessSelectorProps) => {
  // State for dialog visibility
  const [open, setOpen] = useState(false);
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filters the roundness grades based on search term
   * Searches in both term and description fields
   * Case-insensitive search
   */
  const filteredRoundness = (ROUNDNESS_DATABASE.redondez ?? []).filter(roundness =>
    roundness.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roundness.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles the selection of a roundness grade
   * Updates the selection, closes the dialog and resets search
   * @param {RoundnessTerm} roundness - The selected roundness grade
   */
  const handleSelect = (roundness: RoundnessTerm) => {
    onSelect({
      term: roundness.term,
      description: roundness.description
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
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-between text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <CornerDownLeft className="h-4 w-4" />
            {currentRoundness ? (
              <span className="truncate">{currentRoundness.term}</span>
            ) : (
              <span className="text-muted-foreground">Redondez</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CornerDownLeft className="h-5 w-5 text-blue-600" />
            Seleccionar Redondez
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar redondez..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {currentRoundness && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Grados de Redondez
              </h3>
              {filteredRoundness.map((roundness, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(roundness)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{roundness.term}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {roundness.description}
                      </div>
                    </div>
                    {currentRoundness?.term === roundness.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {filteredRoundness.length === 0 && (
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
