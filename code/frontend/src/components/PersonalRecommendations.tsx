import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  actionLabel: string;
}

interface Props {
  recommendations: Recommendation[];
}

export default function PersonalRecommendations({ recommendations }: Props) {
  return (
    <Card className="p-6 min-h-[220px]">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Personalisierte Empfehlungen</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all"
          >
            <h4 className="text-sm font-semibold text-foreground mb-2">{rec.title}</h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {rec.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 w-full"
              onClick={() => alert('Demo: ' + rec.actionLabel)}
            >
              {rec.actionLabel}
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
