import { Play, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface Publication {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  readTime: string;
  status: string;
  link: string;
}

interface Props {
  publications: Publication[];
  onCreateArticle?: () => void;
}

export default function CorporateDashboardPublications({
  publications,
  onCreateArticle,
}: Props) {
  const navigate = useNavigate();

  const colors = {
    primary: '#C8A96F',
    white: '#FFFFFF',
    primaryLighter: '#C8A96F10',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Publikationen</h2>
        <p className="text-sm text-muted-foreground">
          {publications.length} {publications.length === 1 ? 'Artikel' : 'Artikel'}
        </p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Aktuelle Beiträge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Publications */}
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="bg-muted/50 rounded-lg p-4 flex gap-4 items-center cursor-pointer hover:bg-muted transition-colors"
              onClick={() => navigate(publication.link)}
            >
              <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden bg-muted">
                <img
                  src={publication.imageUrl}
                  alt={publication.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {publication.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {publication.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{publication.status}</span>
                  <span className="mx-2">•</span>
                  <span>{publication.readTime}</span>
                </div>
              </div>
              <button
                className="flex-shrink-0 p-2 rounded-full transition-colors"
                style={{ backgroundColor: colors.primary, color: colors.white }}
                aria-label="Abspielen"
              >
                <Play className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Add Article CTA */}
          <div
            className="border border-dashed rounded-lg p-6 text-center"
            style={{ borderColor: colors.primary, backgroundColor: colors.primaryLighter }}
          >
            <Plus className="w-10 h-10 mx-auto mb-3" style={{ color: colors.primary }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>
              Weitere Artikel hinzufügen
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Erweitern Sie Ihr Unternehmensprofil mit wertvollen Inhalten für Ihre Zielgruppe.
            </p>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: colors.white }}
              onClick={() => {
                if (onCreateArticle) {
                  onCreateArticle();
                } else {
                  alert('Artikel-Editor (MVP-Simulation)');
                }
              }}
            >
              Artikel erstellen
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
