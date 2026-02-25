import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Clock } from 'lucide-react';

interface DevelopmentItem {
  title: string;
  dueInDays: number;
  status: string;
}

interface Props {
  items: DevelopmentItem[];
}

export default function DevelopmentTracker({ items }: Props) {
  const getStatusColor = (status: string) => {
    if (status === 'offen') return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    if (status === 'geplant') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (status === 'abgeschlossen') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ihre Weiterbildung</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => alert(`Training-Details: ${item.title} (Demo)`)}
            className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-foreground flex-1">{item.title}</p>
              <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                {item.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Fällig in {item.dueInDays} Tagen</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert('Weiterbildungsplan anzeigen (Demo)')}
        className="mt-4 w-full px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        Weiterbildungsplan
      </button>
    </Card>
  );
}
