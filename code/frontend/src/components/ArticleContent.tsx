import React from "react";

interface Props {
  summary: string;
  imageUrl: string;
}

export const ArticleContent: React.FC<Props> = ({ summary, imageUrl }) => {
  return (
    <article>
      <img
        src={imageUrl}
        alt="Titelbild des Artikels"
        className="w-full object-cover rounded-lg mb-6 max-h-96"
      />
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </article>
  );
};
