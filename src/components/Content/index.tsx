import { useCallback, useEffect, useMemo, useState } from "react";

import { ColorInput, useColor } from "@/lib/contexts/ColorContext";
import { debounce } from "@/lib/utils";

import { BoxProps } from "./types";

function generateRandomColor(): ColorInput {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  // Generate either RGB or RGBA format
  const format = Math.random() < 0.5 ? "rgb" : "rgba";
  if (format === "rgba") {
    const alpha = Math.random().toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${alpha})` as ColorInput;
  }
  return `rgb(${r}, ${g}, ${b})` as ColorInput;
}

function Box({ backgroundColor }: BoxProps) {
  const { setSelectedColor, openDrawer } = useColor();

  const handleClick = () => {
    setSelectedColor(backgroundColor);
    openDrawer();
  };

  return (
    <div
      className="aspect-square flex items-center justify-center font-medium text-white w-full h-full transition-transform hover:scale-110 hover:shadow-lg hover:z-10 relative cursor-pointer active:scale-95"
      style={{ backgroundColor }}
      onClick={handleClick}
    ></div>
  );
}

export default function Content() {
  const [boxCount, setBoxCount] = useState(254);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });

  // Generate colors once and keep them stable
  const colors = useMemo(() => {
    return Array.from({ length: 254 }, () => generateRandomColor());
  }, []);

  const calculateGridSize = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const sidebarWidth = isMobile ? 0 : 64;
    const availableWidth = window.innerWidth - sidebarWidth;
    const availableHeight = window.innerHeight;

    // Adjust minBoxSize based on screen size
    const minBoxSize = isMobile ? Math.min(availableWidth / 6, 36) : 36;

    const cols = Math.floor(availableWidth / minBoxSize);
    const rows = Math.floor(availableHeight / minBoxSize);

    setGridSize({ cols, rows });
    // Ensure we have at least enough boxes to show all colors
    setBoxCount(Math.max(254, cols * rows));
  }, []);

  useEffect(() => {
    calculateGridSize();
    const debouncedResize = debounce(calculateGridSize, 250);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [calculateGridSize]);

  return (
    <div className="flex-1 h-screen w-full overflow-hidden">
      <div
        className="w-full h-full grid gap-0 content-start"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${100 / gridSize.cols}%, 36px), 1fr))`,
          gridAutoRows: `minmax(min(${100 / gridSize.rows}vh, 36px), 1fr)`,
        }}
      >
        {Array.from({ length: boxCount }, (_, i) => (
          <Box key={i} backgroundColor={colors[i % 254]} />
        ))}
      </div>
    </div>
  );
}
