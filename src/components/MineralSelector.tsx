import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { MINERAL_DATABASE, TEXTURE_DATABASE, COUNTER_COLORS } from '@/types/mineral';
import { GrainSizeSelector } from './GrainSizeSelector';

interface MineralSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (
    mineralName: string, 
    color: string, 
    grainSize?: {
      category: 'sedimentarias' | 'igneas';
      term: string;
      description: string;
    }
  ) => void;
  usedColors: string[];
}

export const MineralSelector = ({ open, onOpenChange, onSelect, usedColors }: MineralSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openTextureCategories, setOpenTextureCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedGrainSize, setSelectedGrainSize] = useState<{
    category: 'sedimentarias' | 'igneas';
    term: string;
    description: string;
  } | undefined>();

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTextureCategory = (category: string) => {
    setOpenTextureCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getAvailableColor = () => {
    const availableColors = COUNTER_COLORS.filter(color => !usedColors.includes(color));
    return availableColors.length > 0 ? availableColors[0] : COUNTER_COLORS[0];
  };

  const handleSelect = (mineralName: string) => {
    const color = selectedColor || getAvailableColor();
    onSelect(mineralName, color, selectedGrainSize);
    onOpenChange(false);
    setSearchTerm('');
    setSelectedColor('');
    setSelectedGrainSize(undefined);
  };

  const categoryNames: Record<string, string> = {
    tectosilicatos: 'Tectosilicatos',
    filosilicatos: 'Filosilicatos',
    inosilicatos: 'Inosilicatos',
    nesosilicatos: 'Nesosilicatos',
    sorosilicatos: 'Sorosilicatos',
    ciclosilicatos: 'Ciclosilicatos',
    carbonatos: 'Carbonatos',
    oxidos: 'Óxidos',
    sulfuros: 'Sulfuros',
    sulfatos: 'Sulfatos',
    fosfatos: 'Fosfatos',
    haluros: 'Haluros',
    alteracion: 'Alteración y Secundarios',
    feldespatoides: 'Feldespatoides',
    zeolitas: 'Zeolitas',
    accesorios: 'Accesorios',
    evaporitas: 'Evaporitas',
    minerales_autigénicos: 'Minerales Autigénicos',
    minerales_detríticos: 'Minerales Detríticos'
  };

  const textureCategoryNames: Record<string, string> = {
    texturas_igneas: 'Texturas Ígneas',
    texturas_sedimentarias: 'Texturas Sedimentarias',
    texturas_metamorficas: 'Texturas Metamórficas',
    componentes_rocas_sedimentarias: 'Componentes de Rocas Sedimentarias',
    tipos_cemento: 'Tipos de Cemento',
    tipos_porosidad: 'Tipos de Porosidad',
    estructuras_sedimentarias: 'Estructuras Sedimentarias',
    alteraciones_diageneticas: 'Alteraciones Diagenéticas'
  };

  const filteredDatabase = Object.entries(MINERAL_DATABASE).reduce((acc, [category, minerals]) => {
    const filtered = minerals.filter(mineral =>
      mineral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mineral.formula.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as typeof MINERAL_DATABASE);

  const filteredTextureDatabase = Object.entries(TEXTURE_DATABASE).reduce((acc, [category, textures]) => {
    const filtered = textures.filter(texture =>
      texture.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      texture.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as typeof TEXTURE_DATABASE);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Seleccionar Mineral o Textura</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar mineral, textura o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Color del contador:</div>
            <div className="flex gap-2 flex-wrap">
              {COUNTER_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                  } ${usedColors.includes(color) ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: color }}
                  title={usedColors.includes(color) ? 'Color en uso' : 'Seleccionar color'}
                />
              ))}
            </div>
            {selectedColor && (
              <div className="text-xs text-gray-600">
                Color seleccionado: <Badge style={{ backgroundColor: selectedColor, color: 'white' }}>●</Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Tamaño de grano (opcional):</div>
            <GrainSizeSelector
              currentGrainSize={selectedGrainSize}
              onSelect={setSelectedGrainSize}
              onClear={() => setSelectedGrainSize(undefined)}
            />
            {selectedGrainSize && (
              <div className="text-xs text-gray-600">
                Tamaño seleccionado: <Badge variant="outline">{selectedGrainSize.term}</Badge>
              </div>
            )}
          </div>

          <Tabs defaultValue="minerals" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="minerals">Minerales</TabsTrigger>
              <TabsTrigger value="textures">Texturas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="minerals" className="flex-1 overflow-y-auto space-y-2 mt-2">
              {Object.entries(filteredDatabase).map(([category, minerals]) => (
                <Collapsible
                  key={category}
                  open={openCategories.includes(category)}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-600 rounded">
                    {openCategories.includes(category) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{categoryNames[category]}</span>
                    <Badge variant="secondary">{minerals.length}</Badge>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 space-y-1">
                    {minerals.map(mineral => (
                      <div
                        key={mineral.name}
                        className="p-2 hover:bg-gray-400 rounded cursor-pointer border border-gray-400"
                        onClick={() => handleSelect(mineral.name)}
                      >
                        <div className="font-medium">{mineral.name}</div>
                        <div className="text-sm text-green-700">{mineral.formula}</div>
                        <div className="text-xs text-orange-600">Sistema: {mineral.system}</div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TabsContent>

            <TabsContent value="textures" className="flex-1 overflow-y-auto space-y-2 mt-2">
              {Object.entries(filteredTextureDatabase).map(([category, textures]) => (
                <Collapsible
                  key={category}
                  open={openTextureCategories.includes(category)}
                  onOpenChange={() => toggleTextureCategory(category)}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-600 rounded">
                    {openTextureCategories.includes(category) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{textureCategoryNames[category]}</span>
                    <Badge variant="secondary">{textures.length}</Badge>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 space-y-1">
                    {textures.map(texture => (
                      <div
                        key={texture.term}
                        className="p-2 hover:bg-gray-400 rounded cursor-pointer border border-gray-400"
                        onClick={() => handleSelect(texture.term)}
                      >
                        <div className="font-medium">{texture.term}</div>
                        <div className="text-sm text-blue-700">{texture.description}</div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};