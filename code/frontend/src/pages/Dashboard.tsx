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
import type { PersonalDashboardResponse } from '../brain/data-contracts';

// ─── Musterdaten für Demo-Betrieb ohne Backend ───
const MOCK_DASHBOARD_DATA: PersonalDashboardResponse = {
  user: {
    fullName: "Dr. Markus Voss",
    role: "Senior Wealth Advisor",
    segments: ["UHNW", "Family Office", "Nachfolgeplanung"],
    nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  weeklyFocus: [
    "Portfolio-Rebalancing Q1 2026 abschließen",
    "ESG-Reporting für Familie Rheinberg vorbereiten",
    "Nachfolgekonzept Müller finalisieren",
  ],
  personalRecommendations: [
    {
      title: "ESG-Trends 2026: Was Ihre Mandanten wissen sollten",
      description: "Neue EU-Regulierung verändert die Spielregeln für nachhaltige Investments. Ein kompakter Überblick für Beratungsgespräche.",
      actionLabel: "Artikel lesen",
    },
    {
      title: "Family Office Governance Workshop",
      description: "Exklusiver Workshop zur Governance-Struktur für Multi-Family-Offices. Nächster Termin: 15. März 2026.",
      actionLabel: "Anmelden",
    },
    {
      title: "Steueroptimierung bei Generationenwechsel",
      description: "Praxisleitfaden zur steuereffizienten Vermögensübertragung mit aktuellen Fallbeispielen.",
      actionLabel: "Deepdive starten",
    },
  ],
  lastUpdated: new Date().toISOString(),
  goals: [
    { label: "Neukundenakquise", target: "12 Mandanten", progress: 75 },
    { label: "AuM Wachstum", target: "€50M", progress: 62 },
    { label: "Kundenzufriedenheit", target: "95%", progress: 91 },
    { label: "Weiterbildung", target: "40 Stunden", progress: 45 },
  ],
  clientHighlights: [
    {
      name: "Familie Rheinberg",
      status: "Aktiv – Portfolioanpassung",
      lastContact: "Vor 3 Tagen",
      nextStep: "ESG-Reporting versenden",
    },
    {
      name: "Dr. Stefan Krüger",
      status: "Nachfolgeplanung Phase 2",
      lastContact: "Vor 1 Woche",
      nextStep: "Steuerberater-Termin koordinieren",
    },
    {
      name: "Stiftung Klara Becker",
      status: "Neuanlage – Due Diligence",
      lastContact: "Gestern",
      nextStep: "Anlagevorschlag präsentieren",
    },
  ],
  favorites: [
    { title: "Marktbericht Q4 2025", type: "Report", link: "/insights" },
    { title: "Nachfolge-Checkliste", type: "Tool", link: "/deepdive-nachfolgeplanung" },
    { title: "ESG-Scoring Modell", type: "Analyse", link: "/insights" },
  ],
  schedule: [
    { title: "Call mit Familie Rheinberg", datetime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), type: "Mandantengespräch" },
    { title: "Internes Portfolio-Review", datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), type: "Meeting" },
    { title: "Workshop: Digitale Vermögensplanung", datetime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), type: "Weiterbildung" },
  ],
  development: [
    { title: "CFA ESG Investing Certificate", provider: "CFA Institute", status: "In Bearbeitung" },
    { title: "Digital Wealth Management", provider: "Frankfurt School", status: "Abgeschlossen" },
    { title: "Nachfolgeplanung Masterclass", provider: "Rheinberg Akademie", status: "Geplant" },
  ],
};

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
  const [dashboardData, setDashboardData] = useState<PersonalDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<PersonalDashboardSettings | undefined>(undefined);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await brain.get_personal_dashboard_overview();
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.warn('[Dashboard] Backend nicht erreichbar, verwende Musterdaten:', err);
        // Fallback auf Musterdaten wenn Backend nicht erreichbar
        setDashboardData(MOCK_DASHBOARD_DATA);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && authUser) {
      fetchDashboardData();
    }
  }, [authLoading, authUser]);

  const handleSaveSettings = async (newSettings: PersonalDashboardSettings) => {
    if (isDemo) {
      // Im Demo-Modus nur lokal speichern
      setSettings(newSettings);
      return;
    }
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

        {/* Demo-Banner */}
        {isDemo && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
            <strong>Demo-Modus:</strong> Das Backend ist nicht verbunden. Sie sehen Musterdaten zur Vorschau.
          </div>
        )}

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
