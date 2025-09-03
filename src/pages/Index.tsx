import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Grid, 
  List, 
  Eye, 
  RotateCcw, 
  Download, 
  Upload,
  Trash2,
  Microscope,
  BookOpen,
  Target,
  Search,
  MousePointer,
  Save,
  Info,
  GripVertical
} from 'lucide-react';
import { useCounters } from '@/hooks/useCounters';
import { MineralSelector } from '@/components/MineralSelector';
import { CounterCard } from '@/components/CounterCard';
import { DragDropContainer } from '@/components/DragDropContainer';
import { DraggableCounterCard } from '@/components/DraggableCounterCard';
import { ThemeToggle } from '@/components/theme-toggle';
import type { ViewMode } from '@/types/mineral';
import { DropResult } from 'react-beautiful-dnd';

export default function MineralCounterApp() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mineralSelectorOpen, setMineralSelectorOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [resetAllDialogOpen, setResetAllDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const { toast } = useToast();
  
  const {
    counters,
    addCounter,
    updateCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    resetAllCounters,
    reorderCounters,
    exportData,
    importData,
    totalCount
  } = useCounters();

  const handleAddCounter = (
    mineralName: string, 
    color: string, 
    grainSize?: {
      category: 'sedimentarias' | 'igneas';
      term: string;
      description: string;
    },
    sphericity?: { term: string; description: string; },
    roundness?: { term: string; description: string; },
    contacts?: { term: string; description: string; },
    sorting?: { term: string; description: string; },
    maturity?: { term: string; description: string; },
    packing?: { term: string; description: string; }
  ) => {
    addCounter(mineralName, color, grainSize, sphericity, roundness, contacts, sorting, maturity, packing);
    toast({
      title: "Contador agregado",
      description: `Se agregó el contador para ${mineralName}`,
    });
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mineral-counters-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportDialogOpen(false);
    toast({
      title: "Datos exportados",
      description: "El archivo se ha descargado correctamente",
    });
  };

  const handleImport = () => {
    if (importData(importText)) {
      toast({
        title: "Datos importados",
        description: "Los contadores se han importado correctamente",
      });
      setImportDialogOpen(false);
      setImportText('');
    } else {
      toast({
        title: "Error al importar",
        description: "El formato de los datos no es válido",
        variant: "destructive",
      });
    }
  };

  const handleResetAll = () => {
    resetAllCounters();
    setResetAllDialogOpen(false);
    toast({
      title: "Contadores reiniciados",
      description: "Todos los contadores han sido reiniciados a 0",
    });
  };

  const handleDeleteAll = () => {
    counters.forEach(counter => deleteCounter(counter.id));
    setDeleteAllDialogOpen(false);
    toast({
      title: "Contadores eliminados",
      description: "Todos los contadores han sido eliminados",
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside a droppable area or no destination
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (destination.index === source.index) {
      return;
    }

    // Reorder the counters
    reorderCounters(source.index, destination.index);
    
    toast({
      title: "Contador reordenado",
      description: "El orden de los contadores ha sido actualizado",
    });
  };

  const usedColors = counters.map(c => c.color);

  const getGridClassName = () => {
    switch (viewMode) {
      case 'individual':
        return 'flex justify-center';
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      case 'list':
        return 'space-y-2';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Microscope className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Contador de Minerales en Sección Delgada
                </h1>
                <p className="text-sm text-muted-foreground">
                  Desarrollado por: <a className='text-orange-600' href="https://www.linkedin.com/in/adrianlinares246/">Adrian Linares</a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Exportar Datos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Se exportarán {counters.length} contadores con un total de {totalCount} conteos.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar JSON
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Importar Datos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Pegar datos JSON:</label>
                      <Textarea
                        placeholder="Pegar aquí el contenido del archivo JSON..."
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        rows={8}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleImport} disabled={!importText.trim()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Importar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card data-card>
              <CardHeader>
                <CardTitle className="text-lg">Controles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setMineralSelectorOpen(true)}
                  className="w-full"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nuevo Contador
                </Button>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Modo de vista:</div>
                  <div className="flex gap-1">
                    {/* <Button
                      variant={viewMode === 'individual' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('individual')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button> */}
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-foreground mb-3">📊 Estadísticas</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50/80 via-blue-100/60 to-indigo-50/80 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-indigo-950/30 p-4 rounded-lg border border-blue-200/30 dark:border-blue-700/30 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-blue-700 dark:text-blue-200 transition-colors">Contadores Activos:</span>
                          <Badge variant="default" className="text-lg px-3 py-1 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors shadow-sm">{counters.length}</Badge>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50/80 via-green-100/60 to-emerald-50/80 dark:from-green-950/30 dark:via-green-900/20 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200/30 dark:border-green-700/30 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-green-700 dark:text-green-200 transition-colors">Total Conteos:</span>
                          <Badge variant="default" className="text-lg px-3 py-1 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400 transition-colors shadow-sm">{totalCount}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {counters.length > 0 && (
                  <div className="space-y-2">
                    <AlertDialog open={resetAllDialogOpen} onOpenChange={setResetAllDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-orange-600 border-orange-300 hover:bg-orange-700"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reiniciar Todo
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción reiniciará todos los contadores a 0. Los contadores no se eliminarán, solo se reiniciarán sus valores.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleResetAll} className="bg-orange-300 hover:bg-orange-600">
                            Sí, reiniciar todo
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar Todo
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará permanentemente todos los contadores y no se puede deshacer. Se perderán todos los datos de conteo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700">
                            Sí, eliminar todo
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Instructions Card */}
            <Card data-card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Instrucciones de Uso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MousePointer className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">1. Crear Contador</h4>
                      <p className="text-xs text-muted-foreground">
                        Haz clic en "Nuevo Contador" para seleccionar un mineral o textura de la base de datos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Search className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">2. Caracterización Completa</h4>
                      <p className="text-xs text-muted-foreground">
                        Selecciona color, tamaño de grano y características texturales sedimentarias (esfericidad, redondez, contactos, sorteo, madurez y empaquetamiento).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">3. Buscar y Seleccionar</h4>
                      <p className="text-xs text-muted-foreground">
                        Usa las pestañas "Minerales" y "Texturas" para encontrar lo que necesitas. Busca por nombre, fórmula o descripción.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MousePointer className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">4. Contar y Personalizar</h4>
                      <p className="text-xs text-muted-foreground">
                        Usa los botones +/- para contar observaciones. Configura incremento, valor máximo y características texturales desde el menú de configuración.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <GripVertical className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">5. Reordenar Contadores</h4>
                      <p className="text-xs text-muted-foreground">
                        Arrastra los contadores por el ícono de grip para reordenarlos según tu preferencia (disponible en vista grid y lista).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Save className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">6. Exportar y Compartir</h4>
                      <p className="text-xs text-muted-foreground">
                        Exporta tus conteos con todas las características texturales en formato JSON para análisis posterior o para compartir con colegas.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    Casos de Uso
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-950/20 dark:to-green-950/20 p-3 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
                      <h4 className="font-semibold text-xs text-emerald-700 dark:text-emerald-300">🔬 Análisis Modal</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        Conteo de minerales para determinar composición modal de rocas ígneas, sedimentarias y metamórficas con caracterización textural completa.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/20 dark:to-indigo-950/20 p-3 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                      <h4 className="font-semibold text-xs text-blue-700 dark:text-blue-300">📊 Análisis Sedimentológico</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Caracterización cuantitativa de propiedades texturales: esfericidad, redondez, contactos, sorteo, madurez textural y empaquetamiento.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 dark:from-purple-950/20 dark:to-violet-950/20 p-3 rounded-lg border border-purple-200/30 dark:border-purple-700/30">
                      <h4 className="font-semibold text-xs text-purple-700 dark:text-purple-300">🎓 Enseñanza</h4>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        Herramienta educativa para estudiantes de geología, petrología, mineralogía y sedimentología en prácticas de laboratorio.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 dark:from-amber-950/20 dark:to-yellow-950/20 p-3 rounded-lg border border-amber-200/30 dark:border-amber-700/30">
                      <h4 className="font-semibold text-xs text-amber-700 dark:text-amber-300">⛏️ Investigación</h4>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Investigación académica y profesional en ciencias de la Tierra con análisis cuantitativo microscópico y caracterización textural detallada.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Drag and drop hint */}
            {counters.length > 1 && viewMode !== 'individual' && (
              <div className="mb-4 p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/30 dark:border-blue-700/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <GripVertical className="h-4 w-4" />
                  <span className="font-medium">Tip:</span>
                  <span>Arrastra las tarjetas por el ícono de grip para reordenarlas</span>
                </div>
              </div>
            )}
            
            {counters.length === 0 ? (
              <Card className="text-center py-12" data-card>
                <CardContent>
                  <Microscope className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No hay contadores</h3>
                  <p className="text-muted-foreground mb-4">
                    Agrega tu primer contador de mineral para comenzar
                  </p>
                  <Button onClick={() => setMineralSelectorOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Contador
                  </Button>
                </CardContent>
              </Card>
            ) : (
              viewMode === 'individual' && counters.length > 0 ? (
                <div className={getGridClassName()}>
                  <CounterCard
                    counter={counters[0]}
                    onIncrement={() => incrementCounter(counters[0].id)}
                    onDecrement={() => decrementCounter(counters[0].id)}
                    onReset={() => resetCounter(counters[0].id)}
                    onDelete={() => deleteCounter(counters[0].id)}
                    onUpdate={(updates) => updateCounter(counters[0].id, updates)}
                    viewMode={viewMode}
                  />
                </div>
              ) : (
                <DragDropContainer
                  onDragEnd={handleDragEnd}
                  droppableId="counters"
                  className={getGridClassName()}
                >
                  {counters.map((counter, index) => (
                    <DraggableCounterCard
                      key={counter.id}
                      counter={counter}
                      index={index}
                      onIncrement={() => incrementCounter(counter.id)}
                      onDecrement={() => decrementCounter(counter.id)}
                      onReset={() => resetCounter(counter.id)}
                      onDelete={() => deleteCounter(counter.id)}
                      onUpdate={(updates) => updateCounter(counter.id, updates)}
                      viewMode={viewMode}
                      isDragEnabled={counters.length > 1}
                    />
                  ))}
                </DragDropContainer>
              )
            )}

            {viewMode === 'individual' && counters.length > 1 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Mostrando contador 1 de {counters.length}
                </p>
                <div className="flex justify-center gap-2">
                  {counters.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === 0 ? 'bg-primary' : 'bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MineralSelector
        open={mineralSelectorOpen}
        onOpenChange={setMineralSelectorOpen}
        onSelect={handleAddCounter}
        usedColors={usedColors}
      />
    </div>
  );
}