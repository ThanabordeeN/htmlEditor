import React, { useEffect, useRef } from 'react';

interface Props {
  htmlContent: string;
  onElementSelect: (element: HTMLElement) => void;
}

export const SandboxIframe: React.FC<Props> = ({ htmlContent, onElementSelect }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update the iframe content whenever htmlContent changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlContent;
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

    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.addEventListener('click', handleClick);
      }
    };

    iframe.addEventListener('load', onLoad);
    return () => {
      iframe.removeEventListener('load', onLoad);
      const doc = iframe.contentDocument;
      doc?.removeEventListener('click', handleClick);
    };
  }, [onElementSelect]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      className="w-full flex-1"
      title="sandbox"
    />
  );
};

