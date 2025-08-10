import React, { useCallback } from 'react';
import { SandboxIframe } from './components/SandboxIframe';
import { PropertyInspector } from './components/PropertyInspector';
import { useStore } from './state/useStore';
import { TailwindStyleObject, ClassMutationCommand } from './types';

const App: React.FC = () => {
  const {
    htmlContent,
    setHtmlContent,
    setSelectedElement,
    computedStyles,
    setComputedStyles,
  } = useStore();

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setHtmlContent(String(reader.result));
      };
      reader.readAsText(file);
    },
    [setHtmlContent]
  );

  const handleElementSelect = useCallback(
    (el: HTMLElement) => {
      setSelectedElement(el);
      // Placeholder style computation: simply list classes under layout
      const styles: TailwindStyleObject = {
        layout: {},
        spacing: {},
        typography: {},
        backgrounds: {},
        borders: {},
        effects: {},
      };
      el.className.split(' ').forEach((cls) => {
        if (cls) styles.layout[cls] = '';
      });
      setComputedStyles(styles);
    },
    [setSelectedElement, setComputedStyles]
  );

  const handleDownload = useCallback(() => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [htmlContent]);

  const handleClassChange = useCallback((command: ClassMutationCommand) => {
    // TODO: Implement Class Mutator Engine
    console.log('class change', command);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-2/3 border-r">
        <div className="p-2 flex gap-2 border-b">
          <input type="file" accept=".html" onChange={handleFileUpload} />
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        <SandboxIframe
          htmlContent={htmlContent}
          onElementSelect={handleElementSelect}
          onHtmlChange={setHtmlContent}
        />
      </div>
      <div className="w-1/3">
        <PropertyInspector
          styles={computedStyles}
          onClassChange={handleClassChange}
        />
      </div>
    </div>
  );
};

export default App;

