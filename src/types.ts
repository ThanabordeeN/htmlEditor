/**
 * โครงสร้างสำหรับเก็บข้อมูลสไตล์ที่ประมวลผลจาก Tailwind classes
 */
export interface TailwindStyleObject {
  layout: { [key: string]: string };
  spacing: { [key: string]: string };
  typography: { [key: string]: string };
  backgrounds: { [key: string]: string };
  borders: { [key: string]: string };
  effects: { [key: string]: string };
  // ... etc.
}

/**
 * โครงสร้างสำหรับคำสั่งแก้ไข class list
 */
export interface ClassMutationCommand {
  action: 'add' | 'remove' | 'replace';
  /** The class to be replaced. Required for 'replace' action. */
  oldClass?: string;
  /** The new class to be added or to replace the old one. */
  newClass: string;
  /** The category of the class, e.g., 'margin-top'. Used for conflict resolution. */
  category: string;
}

