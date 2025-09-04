import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Ruler, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GRAIN_SIZE_DATABASE, GrainSizeTerm } from '@/types/mineral';

/**
 * Interface for the GrainSizeSelector component props
 * @interface GrainSizeSelectorProps
 * @property {Object} currentGrainSize - Currently selected grain size (optional)
 * @property {('sedimentarias' | 'igneas')} currentGrainSize.category - Rock type category
 * @property {string} currentGrainSize.term - Name of the grain size
 * @property {string} currentGrainSize.description - Description of the grain size
 * @property {Function} onSelect - Callback when a grain size is selected
 * @property {Function} onClear - Callback when the selection is cleared
 */
interface GrainSizeSelectorProps {
  currentGrainSize?: {
    category: 'sedimentarias' | 'igneas';
    term: string;
    description: string;
  };
  onSelect: (grainSize: { category: 'sedimentarias' | 'igneas'; term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * GrainSizeSelector Component
 * 
 * A dialog-based selector for choosing grain sizes in geological studies.
 * Supports two categories: sedimentary and igneous rocks.
 * Features search functionality and clear selection option.
 * 
 * @component
 * @example
 * ```tsx
 * <GrainSizeSelector
 *   currentGrainSize={selectedSize}
 *   onSelect={(size) => handleSizeSelection(size)}
 *   onClear={() => clearSizeSelection()}
 * />
 * ```
 */
export const GrainSizeSelector = ({ 
  currentGrainSize, 
  onSelect, 
  onClear 
}: GrainSizeSelectorProps) => {
  // State management for the component
  const [open, setOpen] = useState(false);            // Controls dialog visibility
  const [searchTerm, setSearchTerm] = useState('');   // Manages search input
  const [activeTab, setActiveTab] = useState<'sedimentarias' | 'igneas'>('sedimentarias');  // Current tab

  // Labels for rock categories
  const categoryLabels = {
    sedimentarias: 'Rocas Sedimentarias',
    igneas: 'Rocas Ígneas'
  };

  /**
   * Filters grain sizes based on search term
   * Searches in both term and description fields
   * Groups results by rock category
   */
  const filteredGrainSizes = Object.entries(GRAIN_SIZE_DATABASE).reduce((acc, [key, grainSizes]) => {
    const categoryKey = key.includes('sedimentarias') ? 'sedimentarias' : 'igneas';
    const filtered = grainSizes.filter(grainSize =>
      grainSize.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grainSize.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[categoryKey] = filtered;
    }
    return acc;
  }, {} as Record<'sedimentarias' | 'igneas', GrainSizeTerm[]>);

  /**
   * Handles the selection of a grain size
   * @param {GrainSizeTerm} grainSize - The selected grain size
   * @param {'sedimentarias' | 'igneas'} category - The rock category
   */
  const handleSelect = (grainSize: GrainSizeTerm, category: 'sedimentarias' | 'igneas') => {
    onSelect({
      category,
      term: grainSize.term,
      description: grainSize.description
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
            <Ruler className="h-4 w-4" />
            {currentGrainSize ? (
              <span className="truncate">{currentGrainSize.term}</span>
            ) : (
              <span className="text-muted-foreground">Tamaño de grano</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      {/* Dialog content with tabs and search */}
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-blue-600" />
            Seleccionar Tamaño de Grano
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tamaño de grano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {currentGrainSize && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sedimentarias' | 'igneas')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sedimentarias">Sedimentarias</TabsTrigger>
              <TabsTrigger value="igneas">Ígneas</TabsTrigger>
            </TabsList>

            <TabsContent value="sedimentarias" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2 pr-4">
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">
                    {categoryLabels.sedimentarias}
                  </h3>
                  {filteredGrainSizes.sedimentarias?.map((grainSize, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(grainSize, 'sedimentarias')}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{grainSize.term}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {grainSize.description}
                          </div>
                        </div>
                        {currentGrainSize?.term === grainSize.term && currentGrainSize?.category === 'sedimentarias' && (
                          <Badge variant="default" className="ml-2">Seleccionado</Badge>
                        )}
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-muted-foreground">
                      No se encontraron tamaños de grano para "{searchTerm}"
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="igneas" className="mt-4">
              <ScrollArea className="h-80">
                <div className="space-y-2 pr-4">
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">
                    {categoryLabels.igneas}
                  </h3>
                  {filteredGrainSizes.igneas?.map((grainSize, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(grainSize, 'igneas')}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{grainSize.term}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {grainSize.description}
                          </div>
                        </div>
                        {currentGrainSize?.term === grainSize.term && currentGrainSize?.category === 'igneas' && (
                          <Badge variant="default" className="ml-2">Seleccionado</Badge>
                        )}
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-muted-foreground">
                      No se encontraron tamaños de grano para "{searchTerm}"
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
