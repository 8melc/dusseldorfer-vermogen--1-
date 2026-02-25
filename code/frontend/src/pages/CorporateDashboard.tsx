import { useState, useEffect } from 'react';
import brain from 'brain';
import CorporateDashboardKpiSummary from 'components/CorporateDashboardKpiSummary';
import CorporateDashboardActionCenter from 'components/CorporateDashboardActionCenter';
import CorporateDashboardAiInsights from 'components/CorporateDashboardAiInsights';
import CorporateDashboardPublications from 'components/CorporateDashboardPublications';
import type {
  CorporateDashboardKpisResponse,
  DashboardActionsResponse,
  DashboardAiInsightResponse,
} from 'types';

export default function CorporateDashboard() {
  const [kpisData, setKpisData] = useState<CorporateDashboardKpisResponse | null>(null);
  const [actionsData, setActionsData] = useState<DashboardActionsResponse | null>(null);
  const [aiInsightData, setAiInsightData] = useState<DashboardAiInsightResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dummy publications data
  const publicationsData = [
    {
      id: 'pub-1',
      title: 'Vermögensstrategien für die Zukunft',
      description: 'Unsere Experten analysieren aktuelle Markttrends und entwickeln nachhaltige Anlagestrategien...',
      imageUrl: 'https://static.databutton.com/public/ee4636b7-80c9-4c5a-bd78-1ceec3fa07de/philosophy_08_regional_klassisches_gebaeude.jpg',
      readTime: '5 Min. Lesezeit',
      status: 'Aktuelle Publikation',
      link: '/insights',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Rheinberg corporate dashboard data in parallel
        const [kpisResponse, actionsResponse, aiInsightResponse] = await Promise.all([
          brain.get_corporate_rheinberg_dashboard_kpis(),
          brain.get_corporate_rheinberg_dashboard_actions(),
          brain.get_corporate_rheinberg_dashboard_ai_insight(),
        ]);

        // Parse responses
        const kpis = await kpisResponse.json();
        const actions = await actionsResponse.json();
        const aiInsight = await aiInsightResponse.json();

        setKpisData(kpis);
        setActionsData(actions);
        setAiInsightData(aiInsight);
      } catch (err) {
        console.error('Corporate Dashboard konnte nicht geladen werden:', err);
        setError('Fehler beim Laden der Dashboard-Daten. Bitte versuchen Sie es später erneut.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Corporate Dashboard wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">Fehler beim Laden</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Seite neu laden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Rheinberg Privatbank</h1>
          <p className="text-muted-foreground">
            Tradition trifft Innovation in der Vermögensverwaltung
          </p>
        </div>

        {/* KPIs Section */}
        {kpisData && (
          <CorporateDashboardKpiSummary
            assetsUnderAdvisory={kpisData.assetsUnderAdvisory}
            premiumClients={kpisData.premiumClients}
            conversionRate={kpisData.conversionRate}
            clientSatisfaction={kpisData.clientSatisfaction}
            esgQuote={kpisData.esgQuote}
            period={kpisData.period}
          />
        )}

        {/* Publications Section */}
        <CorporateDashboardPublications publications={publicationsData} />

        {/* Two Column Layout for Actions and AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Action Center */}
          <div>
            {actionsData && (
              <CorporateDashboardActionCenter
                actions={actionsData.actions}
                totalCount={actionsData.totalCount}
                pendingCount={actionsData.pendingCount}
                highPriorityCount={actionsData.highPriorityCount}
              />
            )}
          </div>

          {/* AI Insights */}
          <div>
            {aiInsightData && (
              <CorporateDashboardAiInsights
                summary={aiInsightData.summary}
                insights={aiInsightData.insights}
                recommendedActions={aiInsightData.recommendedActions}
                generatedAt={aiInsightData.generatedAt}
                model={aiInsightData.model}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
