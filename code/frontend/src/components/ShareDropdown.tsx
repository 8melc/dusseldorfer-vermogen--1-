// ui/src/components/ShareDropdown.tsx
import React from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2, Save, Mail, Linkedin, Copy } from "lucide-react";

interface Props {
  urlToShare: string;
  titleToShare: string;
  onSave?: () => void;
}

export const ShareDropdown: React.FC<Props> = ({
  urlToShare,
  titleToShare,
  onSave,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlToShare).then(
      () => {
        toast.success("Link wurde in die Zwischenablage kopiert!");
      },
      (err) => {
        toast.error("Fehler beim Kopieren des Links.");
        console.error("Could not copy text: ", err);
      },
    );
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Interessanter Artikel: ${titleToShare}`);
    const body = encodeURIComponent(
      `Hallo,\n\nich dachte, dieser Artikel könnte dich interessieren:\n\n${titleToShare}\n${urlToShare}\n\nViele Grüße`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      urlToShare,
    )}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
      toast.info("Artikel wurde für später gespeichert.");
    } else {
      toast.warning("Speicherfunktion ist nicht verfügbar.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Inhalte teilen"
          className="hover:bg-gray-100 rounded-full"
        >
          <Share2 className="h-5 w-5 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onSelect={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          <span>Für später speichern</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={shareViaEmail}>
          <Mail className="mr-2 h-4 w-4" />
          <span>Per E-Mail teilen</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={shareOnLinkedIn}>
          <Linkedin className="mr-2 h-4 w-4" />
          <span>Auf LinkedIn teilen</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={copyToClipboard}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Link kopieren</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
