import { create } from 'zustand';
import { TailwindStyleObject } from '../types';

interface AppState {
  htmlContent: string;
  selectedElement: HTMLElement | null;
  computedStyles: TailwindStyleObject | null;
  setHtmlContent: (html: string) => void;
  setSelectedElement: (el: HTMLElement | null) => void;
  setComputedStyles: (styles: TailwindStyleObject | null) => void;
}

export const useStore = create<AppState>((set) => ({
  htmlContent: '',
  selectedElement: null,
  computedStyles: null,
  setHtmlContent: (html) => set({ htmlContent: html }),
  setSelectedElement: (el) => set({ selectedElement: el }),
  setComputedStyles: (styles) => set({ computedStyles: styles }),
}));

