import React from "react";

interface Props {
  category: string;
  title: string;
  author: string;
  date: string;
  source: string;
}

export const ArticleHeader: React.FC<Props> = ({
  category,
  title,
  author,
  date,
  source,
}) => {
  return (
    <header>
      <span className="text-sm font-semibold text-secondary uppercase">
        {category}
      </span>
      <h1 className="text-4xl font-bold text-primary-dark mt-2 mb-4">
        {title}
      </h1>
      <div className="flex items-center text-gray-500 text-sm">
        <span>Von {author}</span>
        <span className="mx-2">|</span>
        <span>{date}</span>
        <span className="mx-2">|</span>
        <span>Quelle: {source}</span>
      </div>
    </header>
  );
};
