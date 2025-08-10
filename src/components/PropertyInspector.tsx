import React from 'react';
import { TailwindStyleObject, ClassMutationCommand } from '../types';

interface Props {
  styles: TailwindStyleObject | null;
  onClassChange: (command: ClassMutationCommand) => void;
}

/**
 * Read-only placeholder property inspector.
 * Displays the computed Tailwind style object as JSON.
 */
export const PropertyInspector: React.FC<Props> = ({ styles }) => {
  if (!styles) {
    return <div className="p-4 text-sm">No element selected</div>;
  }

  return (
    <div className="p-4 text-xs overflow-y-auto h-full">
      <pre>{JSON.stringify(styles, null, 2)}</pre>
    </div>
  );
};

