import { createContext, useContext, useState } from "react";

export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorInput = HexColor | RGBColor | RGBAColor;

export interface ColorContextType {
  selectedColor: ColorInput | null;
  isDrawerOpen: boolean;
  setSelectedColor: (color: ColorInput | null) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<ColorInput | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <ColorContext.Provider
      value={{
        selectedColor,
        isDrawerOpen,
        setSelectedColor,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext)!;
