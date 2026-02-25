import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AiInsightItem {
  type: 'opportunity' | 'trend' | 'risk' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionLabel: string;
}

interface Props {
  summary: string;
  insights: AiInsightItem[];
  recommendedActions: string[];
  generatedAt: string;
  model: string;
}

export default function CorporateDashboardAiInsights({
  summary,
  insights,
  recommendedActions,
  generatedAt,
  model,
}: Props) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />;
      case 'trend':
        return <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />;
      case 'recommendation':
        return <Lightbulb className="h-5 w-5 text-orange-600 dark:text-orange-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'trend':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'recommendation':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}% Konfidenz`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'opportunity': return 'Chance';
      case 'trend': return 'Trend';
      case 'risk': return 'Risiko';
      case 'recommendation': return 'Empfehlung';
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">KI-Einblicke</h2>
        </div>
        <p className="text-xs text-muted-foreground">{model}</p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          <p className="text-xs text-muted-foreground mt-3">
            Generiert am {new Date(generatedAt).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Wichtigste Erkenntnisse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background"
            >
              <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                  <Badge className={getInsightColor(insight.type)} variant="secondary">
                    {getTypeLabel(insight.type)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatConfidence(insight.confidence)}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    {insight.actionLabel}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Empfohlene Maßnahmen</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
