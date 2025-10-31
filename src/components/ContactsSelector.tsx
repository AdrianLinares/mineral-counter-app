import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Hand, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CONTACTS_DATABASE, ContactsTerm } from '@/types/mineral';

/**
 * Interface that defines the props for the ContactsSelector component
 * @interface ContactsSelectorProps
 * @property {Object} currentContacts - The currently selected contact type (optional)
 * @property {string} currentContacts.term - The name of the contact type
 * @property {string} currentContacts.description - The description of the contact type
 * @property {Function} onSelect - Callback function called when a contact type is selected
 * @property {Function} onClear - Callback function called when the selection is cleared
 */
interface ContactsSelectorProps {
  currentContacts?: {
    term: string;
    description: string;
  };
  onSelect: (contacts: { term: string; description: string; }) => void;
  onClear: () => void;
}

/**
 * ContactsSelector Component
 * 
 * This component creates a dialog-based selector for contact types between mineral grains.
 * It allows users to:
 * - Select a contact type from a list
 * - Search through available contact types
 * - Clear their current selection
 * 
 * @component
 * @param {ContactsSelectorProps} props - The component props
 */
export const ContactsSelector = ({ 
  currentContacts, 
  onSelect, 
  onClear 
}: ContactsSelectorProps) => {
  // State for controlling the dialog's open/closed status
  const [open, setOpen] = useState(false);
  // State for storing the search input value
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filters the contacts database based on the search term
   * Searches in both the term and description fields
   */
  const filteredContacts = (CONTACTS_DATABASE.contactos ?? []).filter(contacts =>
    contacts.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contacts.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles the selection of a contact type
   * @param {ContactsTerm} contacts - The selected contact type
   */
  const handleSelect = (contacts: ContactsTerm) => {
    onSelect({
      term: contacts.term,
      description: contacts.description
    });
    setOpen(false);
    setSearchTerm('');
  };

  /**
   * Handles clearing the current selection
   */
  const handleClear = () => {
    onClear();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button that triggers the dialog */}
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-between text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <Hand className="h-4 w-4" />
            {/* Shows either the selected contact type or placeholder text */}
            {currentContacts ? (
              <span className="truncate">{currentContacts.term}</span>
            ) : (
              <span className="text-muted-foreground">Tipo de contacto</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      
      {/* Dialog content */}
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5 text-blue-600" />
            Seleccionar Tipo de Contacto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and clear button section */}
          <div className="flex items-center gap-2">
            {/* Search input with icon */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tipo de contacto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Clear button - only shown when there's a selection */}
            {currentContacts && (
              <Button variant="outline" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Scrollable area with contact types list */}
          <ScrollArea className="h-80">
            <div className="space-y-2 pr-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Tipos de Contacto entre Granos
              </h3>
              {/* Map through filtered contacts and render each one */}
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
                    {/* Show badge for currently selected contact type */}
                    {currentContacts?.term === contacts.term && (
                      <Badge variant="default" className="ml-2">Seleccionado</Badge>
                    )}
                  </div>
                </div>
              ))}
              {/* No results message */}
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
