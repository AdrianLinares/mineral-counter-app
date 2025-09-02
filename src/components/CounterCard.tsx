import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Settings, RotateCcw, Trash2, Ruler } from 'lucide-react';
import { Counter } from '@/types/mineral';
import { COUNTER_COLORS } from '@/types/mineral';
import { GrainSizeSelector } from './GrainSizeSelector';

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

  // Agregar esta función para resetear los valores
  const resetEditValues = () => {
    setEditIncrement(counter.increment.toString());
    setEditMaxValue(counter.maxValue?.toString() || '');
    setEditColor(counter.color);
    setEditGrainSize(counter.grainSize);
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
      grainSize: editGrainSize
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