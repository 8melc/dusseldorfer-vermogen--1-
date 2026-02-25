import { Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  category: string;
  clientName?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface Props {
  actions: ActionItem[];
  totalCount: number;
  pendingCount: number;
  highPriorityCount: number;
}

export default function DashboardActionCenter({
  actions,
  totalCount,
  pendingCount,
  highPriorityCount,
}: Props) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-orange-600 dark:text-orange-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500" />;
      default:
        return null;
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `In ${diffDays} days`;

    return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Ihre offenen Aufgaben</h2>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{totalCount} Gesamt</span>
          <span className="text-red-600 dark:text-red-500 font-medium">{highPriorityCount} Hohe Priorität</span>
          <span>{pendingCount} Ausstehend</span>
        </div>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Aktuelle Aufgaben</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Keine ausstehenden Aufgaben</p>
          ) : (
            actions.map((action) => (
              <div
                key={action.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(action.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
                      <Badge className={getPriorityColor(action.priority)} variant="secondary">
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {action.clientName && (
                        <span className="font-medium text-foreground">{action.clientName}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDeadline(action.deadline)}
                      </span>
                      <span className="capitalize">{action.category.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
