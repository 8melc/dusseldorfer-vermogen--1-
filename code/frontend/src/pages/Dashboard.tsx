import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import brain from 'brain';
import { useCurrentUser } from 'app';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Calendar, ExternalLink } from 'lucide-react';
import WeeklyFocus from 'components/WeeklyFocus';
import PersonalRecommendations from 'components/PersonalRecommendations';
import ClientHighlights from 'components/ClientHighlights';
import GoalsProgress from 'components/GoalsProgress';
import FavoritesList from 'components/FavoritesList';
import SchedulePreview from 'components/SchedulePreview';
import DevelopmentTracker from 'components/DevelopmentTracker';
import { PersonalDashboardSettingsDialog, PersonalDashboardSettings } from 'components/PersonalDashboardSettings';
import type { PersonalDashboardOverviewResponse } from 'types';

/**
 * Generate avatar initials from name or email
 */
const getInitials = (fullName: string | null | undefined): string => {
  if (!fullName || fullName.trim() === '') {
    return '??';
  }
  const parts = fullName.trim().split(/\s+/);
  return parts
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading } = useCurrentUser();
  const [dashboardData, setDashboardData] = useState<PersonalDashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<PersonalDashboardSettings | undefined>(undefined);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await brain.get_personal_dashboard_overview();
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Dashboard-Daten konnten nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && authUser) {
      fetchDashboardData();
    }
  }, [authLoading, authUser]);

  const handleSaveSettings = async (newSettings: PersonalDashboardSettings) => {
    try {
      const response = await brain.save_personal_dashboard_settings({
        investment_focus: newSettings.investmentFocus,
        content_frequency: newSettings.contentFrequency,
        preferred_formats: newSettings.preferredFormats,
        notifications_enabled: newSettings.notificationsEnabled,
        ai_tone: newSettings.aiTone,
      });
      await response.json();
      setSettings(newSettings);
    } catch (err) {
      console.error('Failed to save settings:', err);
      throw err;
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Dashboard wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
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

  if (!dashboardData) {
    return null;
  }

  // Extract user info
  const fullName = dashboardData.user.fullName || authUser?.displayName || authUser?.email?.split('@')[0] || '';
  const initials = getInitials(fullName);
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatLastUpdated = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get current date/time for "Zuletzt aktualisiert"
  const getCurrentDateTime = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        {/* Profile Header with Avatar and Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar with Initials */}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">{initials}</span>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Willkommen zurück, {fullName}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-muted-foreground">{dashboardData.user.role}</p>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex gap-2">
                    {dashboardData.user.segments.map((segment, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>
                {dashboardData.user.nextMeeting && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Nächster Termin: {formatDateTime(dashboardData.user.nextMeeting)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Button Group */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/rheinberg-privatbank-corporate-page')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Corporate Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Einstellungen
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Zuletzt aktualisiert: {getCurrentDateTime()}
              </p>
            </div>
          </div>
        </Card>

        {/* Two Column Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Left Column: Main Content */}
          <div className="space-y-6">
            <ClientHighlights clients={dashboardData.clientHighlights} />
            <SchedulePreview schedule={dashboardData.schedule} />
            <FavoritesList favorites={dashboardData.favorites} />
          </div>

          {/* Right Column: Focus & Goals */}
          <div className="space-y-6">
            <WeeklyFocus focus={dashboardData.weeklyFocus} />
            <GoalsProgress goals={dashboardData.goals} />
            <DevelopmentTracker items={dashboardData.development} />
          </div>
        </div>

        {/* Personal Recommendations - Full Width */}
        <PersonalRecommendations recommendations={dashboardData.personalRecommendations} />

        {/* Settings Dialog */}
        <PersonalDashboardSettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          initialSettings={settings}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  );
}
