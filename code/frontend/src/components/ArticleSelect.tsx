// ui/src/components/ArticleSelect.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Article {
  value: string;
  label: string;
}

interface Props {
  articles: Article[];
}

export const ArticleSelect: React.FC<Props> = ({ articles }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="article-select" className="text-lg font-medium text-gray-700">
        1. Artikel auswählen
      </Label>
      <Select>
        <SelectTrigger
          id="article-select"
          className="w-full"
          aria-label="Wählen Sie einen Artikel aus"
        >
          <SelectValue placeholder="Bitte wählen Sie einen Artikel..." />
        </SelectTrigger>
        <SelectContent>
          {articles.map((article) => (
            <SelectItem key={article.value} value={article.value}>
              {article.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
