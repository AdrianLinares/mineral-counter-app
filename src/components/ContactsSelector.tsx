import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Hand, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CONTACTS_DATABASE, ContactsTerm } from '@/types/mineral';

interface ContactsSelectorProps {
  currentContacts?: {
    term: string;
    description: string;
  };
  onSelect: (contacts: { term: string; description: string; }) => void;
  onClear: () => void;
}

export const ContactsSelector = ({ 
  currentContacts, 
  onSelect, 
  onClear 
}: ContactsSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = CONTACTS_DATABASE.contactos.filter(contacts =>
    contacts.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contacts.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (contacts: ContactsTerm) => {
    onSelect({
      term: contacts.term,
      description: contacts.description
    });
    setOpen(false);
    setSearchTerm('');
  };

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
            <Hand className="h-4 w-4" />
            {currentContacts ? (
              <span className="truncate">{currentContacts.term}</span>
            ) : (
              <span className="text-muted-foreground">Tipo de contacto</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5 text-blue-600" />
            Seleccionar Tipo de Contacto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tipo de contacto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {currentContacts && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Tipos de Contacto entre Granos
              </h3>
              {filteredContacts.map((contacts, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(contacts)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{contacts.term}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {contacts.description}
                      </div>
                    </div>
                    {currentContacts?.term === contacts.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && (
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
