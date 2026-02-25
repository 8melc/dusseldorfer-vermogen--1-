import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleItem {
  title: string;
  datetime: string;
}

interface Props {
  schedule: ScheduleItem[];
}

export default function SchedulePreview({ schedule }: Props) {
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const dateFormatted = new Intl.DateTimeFormat('de-DE', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    }).format(date);
    const timeFormatted = new Intl.DateTimeFormat('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
    return { date: dateFormatted, time: timeFormatted };
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ihre nächsten Termine</h3>
      </div>

      <div className="space-y-3">
        {schedule.map((item, index) => {
          const { date, time } = formatDateTime(item.datetime);
          return (
            <div
              key={index}
              onClick={() => alert(`Termin-Details: ${item.title} (Demo)`)}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <p className="text-sm font-medium text-foreground mb-2">{item.title}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => alert('Kalender öffnen (Demo)')}
        className="mt-4 w-full px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        Zum Kalender
      </button>
    </Card>
  );
}
