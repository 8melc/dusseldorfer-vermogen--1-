import { TrendingUp, TrendingDown, Users, Euro, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KpiItem {
  label: string;
  value: number;
  trend: number; // e.g., 0.125 = +12.5%, -0.021 = -2.1%
  period: string;
}

interface Props {
  kpis: KpiItem[];
}

export default function DashboardKpiSummary({ kpis }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value);
  };

  const formatPercentage = (value: number) => {
    // If value is between 0 and 1, multiply by 100
    const percentage = value < 1 && value > 0 ? value * 100 : value;
    return `${percentage.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />;
    return null;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600 dark:text-green-500';
    if (trend < 0) return 'text-red-600 dark:text-red-500';
    return 'text-muted-foreground';
  };

  const formatValue = (value: number, label: string) => {
    // Check if it's a currency value (large number)
    if (value > 1000000) {
      return formatCurrency(value);
    }
    // Check if it's a percentage (between 0 and 1)
    if (value > 0 && value < 1) {
      return formatPercentage(value);
    }
    // Otherwise just format as number
    return formatNumber(value);
  };

  const getIcon = (index: number) => {
    const icons = [Euro, Users, Target, BarChart3];
    return icons[index] || Euro;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Ihre wichtigsten Kennzahlen</h2>
        <p className="text-sm text-muted-foreground">Letzte 30 Tage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = getIcon(index);
          const trendPercentage = kpi.trend * 100; // Convert to percentage
          
          return (
            <Card key={index} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {formatValue(kpi.value, kpi.label)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(kpi.trend)}
                  <p className={`text-xs font-medium ${getTrendColor(kpi.trend)}`}>
                    {trendPercentage > 0 ? '+' : ''}{trendPercentage.toFixed(1)}% {kpi.period}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
