import React, { useEffect, useRef } from 'react';

interface Props {
  htmlContent: string;
  onElementSelect: (element: HTMLElement) => void;
  onHtmlChange: (html: string) => void;
}

export const SandboxIframe: React.FC<Props> = ({
  htmlContent,
  onElementSelect,
  onHtmlChange,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update the iframe content whenever htmlContent changes
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      const current = doc?.documentElement.outerHTML;
      if (current !== htmlContent) {
        iframeRef.current.srcdoc = htmlContent;
      }
    }
  }, [htmlContent]);

  // Attach click listener inside the iframe for element selection
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onElementSelect(e.target as HTMLElement);
    };

    const handleInput = () => {
      const doc = iframe.contentDocument;
      if (doc) {
        onHtmlChange(doc.documentElement.outerHTML);
      }
    };

    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.addEventListener('click', handleClick);
        doc.addEventListener('input', handleInput);
        if (doc.body) {
          doc.body.contentEditable = 'true';
        }
      }
    };

    iframe.addEventListener('load', onLoad);
    return () => {
      iframe.removeEventListener('load', onLoad);
      const doc = iframe.contentDocument;
      doc?.removeEventListener('click', handleClick);
      doc?.removeEventListener('input', handleInput);
    };
  }, [onElementSelect, onHtmlChange]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      className="w-full flex-1"
      title="sandbox"
    />
  );
};

