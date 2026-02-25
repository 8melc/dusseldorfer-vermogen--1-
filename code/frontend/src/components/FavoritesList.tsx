import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Star } from 'lucide-react';

interface Favorite {
  title: string;
  type: string;
  link: string;
}

interface Props {
  favorites: Favorite[];
}

export default function FavoritesList({ favorites }: Props) {
  const getTypeColor = (type: string) => {
    if (type === 'Report') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (type === 'Dokument') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (type === 'Präsentation') return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ihre Favoriten</h3>
      </div>

      <div className="space-y-3">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            onClick={() => alert(`Öffne: ${favorite.title} (Demo)`)}
            className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {favorite.title}
                </p>
                <Badge className={`mt-1 text-xs ${getTypeColor(favorite.type)}`}>
                  {favorite.type}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => alert('Alle Favoriten anzeigen (Demo)')}
        className="mt-4 w-full px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        Alle Favoriten anzeigen
      </button>
    </Card>
  );
}
