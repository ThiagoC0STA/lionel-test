import { create } from 'zustand';

interface ContextMenuItem {
  label: string;
  onClick: () => void;
}

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  showMenu: (e: React.MouseEvent, items: ContextMenuItem[]) => void;
  hideMenu: () => void;
}

export const useContextMenu = create<ContextMenuState>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  items: [],
  showMenu: (e, items) => {
    e.preventDefault();
    set({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      items,
    });
  },
  hideMenu: () => set({ isOpen: false }),
})); 