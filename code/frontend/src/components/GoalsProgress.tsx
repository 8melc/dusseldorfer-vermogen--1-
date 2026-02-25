import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

interface Goal {
  label: string;
  target: string;
  progress: number;
}

interface Props {
  goals: Goal[];
}

export default function GoalsProgress({ goals }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ihre Jahresziele</h3>
      </div>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{goal.label}</p>
                <p className="text-xs text-muted-foreground">Ziel: {goal.target}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {Math.round(goal.progress * 100)}%
              </span>
            </div>
            <Progress value={goal.progress * 100} className="h-2" />
          </div>
        ))}
      </div>

      <button
        onClick={() => alert('Ziele verwalten (Demo)')}
        className="mt-6 w-full px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-sm font-medium"
      >
        Ziele verwalten
      </button>
    </Card>
  );
}
