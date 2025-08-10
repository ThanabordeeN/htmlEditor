import React, { useEffect, useState } from 'react';
import { TailwindStyleObject, ClassMutationCommand } from '../types';
import { useStore } from '../state/useStore';

interface Props {
  styles: TailwindStyleObject | null;
  onClassChange: (command: ClassMutationCommand) => void;
}

/**
 * Basic property inspector.
 * Allows editing of text content and displays the computed Tailwind style object.
 */
export const PropertyInspector: React.FC<Props> = ({ styles }) => {
  const selectedElement = useStore((state) => state.selectedElement);
  const setHtmlContent = useStore((state) => state.setHtmlContent);
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.textContent || '');
    } else {
      setText('');
    }
  }, [selectedElement]);

  if (!styles) {
    return <div className="p-4 text-sm">No element selected</div>;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (selectedElement) {
      selectedElement.textContent = newText;
      const doc = selectedElement.ownerDocument;
      if (doc) {
        setHtmlContent(doc.documentElement.outerHTML);
      }
    }
  };

  return (
    <div className="p-4 text-xs overflow-y-auto h-full">
      {selectedElement && (
        <div className="mb-4">
          <label className="block mb-1">Text Content</label>
          <textarea
            className="w-full border p-1"
            value={text}
            onChange={handleTextChange}
          />
        </div>
      )}
      <pre>{JSON.stringify(styles, null, 2)}</pre>
    </div>
  );
};

