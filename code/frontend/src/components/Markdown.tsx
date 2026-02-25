// src/components/Markdown.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = { children: string };

export function Markdown({ children }: Props) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="rounded bg-muted px-1 py-0.5" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="rounded p-3 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          li: ({ children }) => <li className="my-1">{children}</li>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}