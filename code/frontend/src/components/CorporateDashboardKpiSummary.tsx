import { TrendingUp, TrendingDown, Users, Euro, Target, BarChart3, Heart, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KpiMetric {
  value: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  previousValue: number;
  currency?: string;
}

interface Props {
  assetsUnderAdvisory: KpiMetric;
  premiumClients: KpiMetric;
  conversionRate: KpiMetric;
  clientSatisfaction: KpiMetric;
  esgQuote: KpiMetric;
  period: string;
}

export default function CorporateDashboardKpiSummary({
  assetsUnderAdvisory,
  premiumClients,
  conversionRate,
  clientSatisfaction,
  esgQuote,
  period,
}: Props) {
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
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />;
    return null;
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) return 'text-green-600 dark:text-green-500';
    if (trend === 'down' && change < 0) return 'text-red-600 dark:text-red-500';
    return 'text-muted-foreground';
  };

  const kpis = [
    {
      title: 'Verwaltetes Vermögen',
      value: formatCurrency(assetsUnderAdvisory.value),
      change: assetsUnderAdvisory.changePercentage,
      trend: assetsUnderAdvisory.trend,
      icon: Euro,
    },
    {
      title: 'Premium-Kunden',
      value: formatNumber(premiumClients.value),
      change: premiumClients.changePercentage,
      trend: premiumClients.trend,
      icon: Users,
    },
    {
      title: 'Conversion-Rate',
      value: formatPercentage(conversionRate.value),
      change: conversionRate.changePercentage,
      trend: conversionRate.trend,
      icon: Target,
    },
    {
      title: 'Kundenzufriedenheit (NPS)',
      value: formatNumber(clientSatisfaction.value),
      change: clientSatisfaction.changePercentage,
      trend: clientSatisfaction.trend,
      icon: Heart,
    },
    {
      title: 'ESG-Quote Neugeschäft',
      value: formatPercentage(esgQuote.value),
      change: esgQuote.changePercentage,
      trend: esgQuote.trend,
      icon: Leaf,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Schlüsselkennzahlen</h2>
        <p className="text-sm text-muted-foreground">{period}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(kpi.trend)}
                  <p className={`text-xs font-medium ${getTrendColor(kpi.trend, kpi.change)}`}>
                    {kpi.change > 0 ? '+' : ''}{formatPercentage(kpi.change)} ggü. Vorperiode
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
