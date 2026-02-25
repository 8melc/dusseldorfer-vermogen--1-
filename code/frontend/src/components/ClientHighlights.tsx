import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface ClientHighlight {
  name: string;
  status: string;
  lastContact: string;
  nextStep: string;
}

interface Props {
  clients: ClientHighlight[];
}

export default function ClientHighlights({ clients }: Props) {
  const getStatusColor = (status: string) => {
    if (status.includes('Betreuung')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (status.includes('Follow-up')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    if (status.includes('Akquise')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Ihre wichtigsten Mandate</h3>
        <button
          onClick={() => alert('Alle Mandate anzeigen (Demo)')}
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          Alle anzeigen
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((client, index) => (
          <div
            key={index}
            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => alert(`Details zu ${client.name} (Demo)`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{client.name}</h4>
                  <Badge className={`mt-1 text-xs ${getStatusColor(client.status)}`}>
                    {client.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground ml-13">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Letzter Kontakt: {formatDate(client.lastContact)}</span>
              </div>
            </div>

            <div className="mt-3 ml-13">
              <div className="text-sm">
                <span className="text-muted-foreground">Nächster Schritt: </span>
                <span className="text-foreground font-medium">{client.nextStep}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
