import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Settings, RotateCcw, Trash2, Ruler, CircleDot, CornerDownLeft, Hand, ArrowUpDown, Target, Package } from 'lucide-react';
import { Counter } from '@/types/mineral';
import { COUNTER_COLORS } from '@/types/mineral';
import { GrainSizeSelector } from './GrainSizeSelector';
import { SphericitySelector } from './SphericitySelector';
import { RoundnessSelector } from './RoundnessSelector';
import { ContactsSelector } from './ContactsSelector';
import { SortingSelector } from './SortingSelector';
import { MaturitySelector } from './MaturitySelector';
import { PackingSelector } from './PackingSelector';

interface CounterCardProps {
  counter: Counter;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Counter>) => void;
  viewMode: 'individual' | 'grid' | 'list';
}

export const CounterCard = ({
  counter,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  onUpdate,
  viewMode
}: CounterCardProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editIncrement, setEditIncrement] = useState(counter.increment.toString());
  const [editMaxValue, setEditMaxValue] = useState(counter.maxValue?.toString() || '');
  const [editColor, setEditColor] = useState(counter.color);
  const [editGrainSize, setEditGrainSize] = useState<{
    category: 'sedimentarias' | 'igneas';
    term: string;
    description: string;
  } | undefined>(counter.grainSize);
  const [editSphericity, setEditSphericity] = useState<{ term: string; description: string; } | undefined>(counter.sphericity);
  const [editRoundness, setEditRoundness] = useState<{ term: string; description: string; } | undefined>(counter.roundness);
  const [editContacts, setEditContacts] = useState<{ term: string; description: string; } | undefined>(counter.contacts);
  const [editSorting, setEditSorting] = useState<{ term: string; description: string; } | undefined>(counter.sorting);
  const [editMaturity, setEditMaturity] = useState<{ term: string; description: string; } | undefined>(counter.maturity);
  const [editPacking, setEditPacking] = useState<{ term: string; description: string; } | undefined>(counter.packing);

  // Agregar esta función para resetear los valores
  const resetEditValues = () => {
    setEditIncrement(counter.increment.toString());
    setEditMaxValue(counter.maxValue?.toString() || '');
    setEditColor(counter.color);
    setEditGrainSize(counter.grainSize);
    setEditSphericity(counter.sphericity);
    setEditRoundness(counter.roundness);
    setEditContacts(counter.contacts);
    setEditSorting(counter.sorting);
    setEditMaturity(counter.maturity);
    setEditPacking(counter.packing);
  };

  // Modificar la función que controla el diálogo
  const handleDialogChange = (open: boolean) => {
    setSettingsOpen(open);
    if (open) {
      resetEditValues();
    }
  };

  const handleSaveSettings = () => {
    onUpdate({
      increment: Math.max(1, parseInt(editIncrement) || 1),
      maxValue: editMaxValue ? parseInt(editMaxValue) : undefined,
      color: editColor,
      grainSize: editGrainSize,
      sphericity: editSphericity,
      roundness: editRoundness,
      contacts: editContacts,
      sorting: editSorting,
      maturity: editMaturity,
      packing: editPacking
    });
    setSettingsOpen(false);
  };

  const handleCancel = () => {
    resetEditValues();
    setSettingsOpen(false);
  };

  if (viewMode === 'list') {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg bg-card" data-card>
        <div className="flex items-center gap-4">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: counter.color }}
          />
          <div>
            <div className="font-medium text-foreground">{counter.mineralName}</div>
            <div className="text-sm text-muted-foreground">
              Incremento: {counter.increment}
              {counter.maxValue && ` | Máximo: ${counter.maxValue}`}
              {counter.grainSize && (
                <div className="flex items-center gap-1 mt-1">
                  <Ruler className="h-3 w-3" />
                  <span>{counter.grainSize.term} ({counter.grainSize.category})</span>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-1">
                {counter.sphericity && (
                  <div className="flex items-center gap-1">
                    <CircleDot className="h-3 w-3" />
                    <span className="text-xs">{counter.sphericity.term}</span>
                  </div>
                )}
                {counter.roundness && (
                  <div className="flex items-center gap-1">
                    <CornerDownLeft className="h-3 w-3" />
                    <span className="text-xs">{counter.roundness.term}</span>
                  </div>
                )}
                {counter.contacts && (
                  <div className="flex items-center gap-1">
                    <Hand className="h-3 w-3" />
                    <span className="text-xs">{counter.contacts.term}</span>
                  </div>
                )}
                {counter.sorting && (
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="h-3 w-3" />
                    <span className="text-xs">{counter.sorting.term}</span>
                  </div>
                )}
                {counter.maturity && (
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span className="text-xs">{counter.maturity.term}</span>
                  </div>
                )}
                {counter.packing && (
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span className="text-xs">{counter.packing.term}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDecrement}
            disabled={counter.value <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Badge variant="secondary" className="text-lg px-3 py-1 min-w-[3rem] text-center">
            {counter.value}
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onIncrement}
            disabled={counter.maxValue ? counter.value >= counter.maxValue : false}
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <Dialog open={settingsOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar {counter.mineralName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="increment">Incremento</Label>
                  <Input
                    id="increment"
                    type="number"
                    min="1"
                    value={editIncrement}
                    onChange={(e) => setEditIncrement(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxValue">Valor máximo (opcional)</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    min="1"
                    placeholder="Sin límite"
                    value={editMaxValue}
                    onChange={(e) => setEditMaxValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <div className="flex gap-2 mt-2">
                    {COUNTER_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setEditColor(color)}
                        className={`w-6 h-6 rounded-full border-2 transition-colors ${
                          editColor === color ? 'border-foreground ring-2 ring-foreground/20' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Tamaño de Grano</Label>
                  <div className="mt-2">
                    <GrainSizeSelector
                      currentGrainSize={editGrainSize}
                      onSelect={setEditGrainSize}
                      onClear={() => setEditGrainSize(undefined)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Esfericidad</Label>
                    <div className="mt-2">
                      <SphericitySelector
                        currentSphericity={editSphericity}
                        onSelect={setEditSphericity}
                        onClear={() => setEditSphericity(undefined)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Redondez</Label>
                    <div className="mt-2">
                      <RoundnessSelector
                        currentRoundness={editRoundness}
                        onSelect={setEditRoundness}
                        onClear={() => setEditRoundness(undefined)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tipo de Contacto</Label>
                    <div className="mt-2">
                      <ContactsSelector
                        currentContacts={editContacts}
                        onSelect={setEditContacts}
                        onClear={() => setEditContacts(undefined)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Sorteo</Label>
                    <div className="mt-2">
                      <SortingSelector
                        currentSorting={editSorting}
                        onSelect={setEditSorting}
                        onClear={() => setEditSorting(undefined)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Madurez Textural</Label>
                    <div className="mt-2">
                      <MaturitySelector
                        currentMaturity={editMaturity}
                        onSelect={setEditMaturity}
                        onClear={() => setEditMaturity(undefined)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Empaquetamiento</Label>
                    <div className="mt-2">
                      <PackingSelector
                        currentPacking={editPacking}
                        onSelect={setEditPacking}
                        onClear={() => setEditPacking(undefined)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onReset}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reiniciar
                    </Button>
                    <Button variant="destructive" onClick={onDelete}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setSettingsOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveSettings}>
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  const cardClassName = viewMode === 'grid' 
    ? "w-full max-w-sm" 
    : "w-full max-w-md mx-auto";

  return (
    <Card className={cardClassName} data-card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: counter.color }}
            />
            <div>
              <h3 className="font-semibold text-sm text-foreground">{counter.mineralName}</h3>
              {counter.grainSize && (
                <div className="flex items-center gap-1 mt-1">
                  <Ruler className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {counter.grainSize.term}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-1 text-muted-foreground">
                {counter.sphericity && (
                  <div className="flex items-center gap-1">
                    <CircleDot className="h-3 w-3" />
                    <span className="text-xs">{counter.sphericity.term}</span>
                  </div>
                )}
                {counter.roundness && (
                  <div className="flex items-center gap-1">
                    <CornerDownLeft className="h-3 w-3" />
                    <span className="text-xs">{counter.roundness.term}</span>
                  </div>
                )}
                {counter.contacts && (
                  <div className="flex items-center gap-1">
                    <Hand className="h-3 w-3" />
                    <span className="text-xs">{counter.contacts.term}</span>
                  </div>
                )}
                {counter.sorting && (
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="h-3 w-3" />
                    <span className="text-xs">{counter.sorting.term}</span>
                  </div>
                )}
                {counter.maturity && (
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span className="text-xs">{counter.maturity.term}</span>
                  </div>
                )}
                {counter.packing && (
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span className="text-xs">{counter.packing.term}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Dialog open={settingsOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurar {counter.mineralName}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="increment">Incremento</Label>
                    <Input
                      id="increment"
                      type="number"
                      min="1"
                      value={editIncrement}
                      onChange={(e) => setEditIncrement(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxValue">Valor máximo (opcional)</Label>
                    <Input
                      id="maxValue"
                      type="number"
                      min="1"
                      placeholder="Sin límite"
                      value={editMaxValue}
                      onChange={(e) => setEditMaxValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <div className="flex gap-2 mt-2">
                      {COUNTER_COLORS.map(color => (
                        <button
                          key={color}
                          onClick={() => setEditColor(color)}
                          className={`w-6 h-6 rounded-full border-2 transition-colors ${
                            editColor === color ? 'border-foreground ring-2 ring-foreground/20' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Tamaño de Grano</Label>
                    <div className="mt-2">
                      <GrainSizeSelector
                        currentGrainSize={editGrainSize}
                        onSelect={setEditGrainSize}
                        onClear={() => setEditGrainSize(undefined)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Esfericidad</Label>
                      <div className="mt-2">
                        <SphericitySelector
                          currentSphericity={editSphericity}
                          onSelect={setEditSphericity}
                          onClear={() => setEditSphericity(undefined)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Redondez</Label>
                      <div className="mt-2">
                        <RoundnessSelector
                          currentRoundness={editRoundness}
                          onSelect={setEditRoundness}
                          onClear={() => setEditRoundness(undefined)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Contacto</Label>
                      <div className="mt-2">
                        <ContactsSelector
                          currentContacts={editContacts}
                          onSelect={setEditContacts}
                          onClear={() => setEditContacts(undefined)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sorteo</Label>
                      <div className="mt-2">
                        <SortingSelector
                          currentSorting={editSorting}
                          onSelect={setEditSorting}
                          onClear={() => setEditSorting(undefined)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Madurez Textural</Label>
                      <div className="mt-2">
                        <MaturitySelector
                          currentMaturity={editMaturity}
                          onSelect={setEditMaturity}
                          onClear={() => setEditMaturity(undefined)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Empaquetamiento</Label>
                      <div className="mt-2">
                        <PackingSelector
                          currentPacking={editPacking}
                          onSelect={setEditPacking}
                          onClear={() => setEditPacking(undefined)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={onReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reiniciar
                      </Button>
                      <Button variant="destructive" onClick={onDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setSettingsOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveSettings}>
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: counter.color }}>
            {counter.value}
          </div>
          {counter.maxValue && (
            <div className="text-sm text-muted-foreground">
              de {counter.maxValue}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onDecrement}
            disabled={counter.value <= 0}
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            className="flex-1"
            onClick={onIncrement}
            disabled={counter.maxValue ? counter.value >= counter.maxValue : false}
            style={{ backgroundColor: counter.color }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-xs text-center text-muted-foreground">
          +{counter.increment} por clic
        </div>
      </CardContent>
    </Card>
  );
};