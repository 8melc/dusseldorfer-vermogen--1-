import { Card } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';

interface Props {
  focus: string[];
}

export default function WeeklyFocus({ focus }: Props) {
  return (
    <Card className="p-6 min-h-[220px]">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ihr Wochenfokus</h3>
      </div>

      <div className="space-y-3">
        {focus.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground italic">
        Konzentrieren Sie sich diese Woche auf diese 3 Prioritäten.
      </p>
    </Card>
  );
}
