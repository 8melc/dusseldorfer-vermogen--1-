import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  initialSettings?: PersonalDashboardSettings;
  onSave: (settings: PersonalDashboardSettings) => Promise<void>;
};

export type PersonalDashboardSettings = {
  investmentFocus: "traditional" | "esg" | "alternatives" | "mixed";
  contentFrequency: "daily" | "weekly" | "monthly";
  preferredFormats: Array<"reports" | "briefings" | "events" | "audio">;
  notificationsEnabled: boolean;
  aiTone: "conservative" | "balanced" | "progressive";
};

const formatLabels: Record<PersonalDashboardSettings["preferredFormats"][number], string> = {
  reports: "Research-Reports",
  briefings: "Executive Briefings",
  events: "Events & Workshops",
  audio: "Audio-Zusammenfassungen",
};

export function PersonalDashboardSettingsDialog({
  open,
  onClose,
  initialSettings,
  onSave,
}: SettingsDialogProps) {
  const [formState, setFormState] = useState<PersonalDashboardSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFormState(
        initialSettings ?? {
          investmentFocus: "mixed",
          contentFrequency: "weekly",
          preferredFormats: ["reports", "briefings"],
          notificationsEnabled: true,
          aiTone: "balanced",
        }
      );
      setError(null);
    }
  }, [open, initialSettings]);

  const toggleFormat = (format: PersonalDashboardSettings["preferredFormats"][number]) => {
    if (!formState) return;
    const isSelected = formState.preferredFormats.includes(format);
    setFormState({
      ...formState,
      preferredFormats: isSelected
        ? formState.preferredFormats.filter((item) => item !== format)
        : [...formState.preferredFormats, format],
    });
  };

  const handleSave = async () => {
    if (!formState) return;
    try {
      setIsSaving(true);
      setError(null);
      await onSave(formState);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Ihre Einstellungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!formState) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Einstellungen für Ihr Dashboard</DialogTitle>
          <DialogDescription>
            Passen Sie an, welche Inhalte und Empfehlungen Sie in Ihrem persönlichen Bereich sehen.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Ihr Investitionsschwerpunkt</Label>
            <Select
              value={formState.investmentFocus}
              onValueChange={(value) =>
                setFormState({ ...formState, investmentFocus: value as PersonalDashboardSettings["investmentFocus"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen Sie einen Schwerpunkt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traditional">Klassische Vermögensstrategie</SelectItem>
                <SelectItem value="esg">Nachhaltige (ESG) Ausrichtung</SelectItem>
                <SelectItem value="alternatives">Alternative Investments</SelectItem>
                <SelectItem value="mixed">Ausbalanciert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Wie oft möchten Sie kuratierte Inhalte erhalten?</Label>
            <Select
              value={formState.contentFrequency}
              onValueChange={(value) =>
                setFormState({ ...formState, contentFrequency: value as PersonalDashboardSettings["contentFrequency"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen Sie eine Frequenz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Täglich</SelectItem>
                <SelectItem value="weekly">Wöchentlich</SelectItem>
                <SelectItem value="monthly">Monatlich</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Welche Formate bevorzugen Sie?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(formatLabels).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center space-x-2 rounded-md border border-border bg-muted/30 px-3 py-2 cursor-pointer"
                >
                  <Checkbox
                    checked={formState.preferredFormats.includes(value as PersonalDashboardSettings["preferredFormats"][number])}
                    onCheckedChange={() => toggleFormat(value as PersonalDashboardSettings["preferredFormats"][number])}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Benachrichtigungen</Label>
              <p className="text-sm text-muted-foreground">
                Erhalten Sie Hinweise, wenn wichtige Aufgaben oder neue Insights für Sie bereitstehen.
              </p>
            </div>
            <Switch
              id="notifications"
              checked={formState.notificationsEnabled}
              onCheckedChange={(checked) =>
                setFormState({ ...formState, notificationsEnabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Tonfall für KI-Empfehlungen</Label>
            <Select
              value={formState.aiTone}
              onValueChange={(value) =>
                setFormState({ ...formState, aiTone: value as PersonalDashboardSettings["aiTone"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Bitte wählen Sie einen Tonfall" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Konservativ & risikoavers</SelectItem>
                <SelectItem value="balanced">Ausgewogen</SelectItem>
                <SelectItem value="progressive">Progressiv & chancenorientiert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Speichern…" : "Einstellungen speichern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
