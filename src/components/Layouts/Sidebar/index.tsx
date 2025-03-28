import { useState } from "react";
import { HelpCircle, Palette, Search } from "lucide-react";

import { ColorInput, useColor } from "@/lib/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import SearchDrawer from "@/components/SearchDrawer";

export default function Sidebar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSelectedColor, openDrawer } = useColor();

  const handleColorSubmit = (color: string) => {
    setSelectedColor(color as ColorInput);
    openDrawer();
  };

  return (
    <>
      <aside className="left-0 top-0 flex h-screen w-16 flex-col items-center bg-black">
        <div className="flex flex-1 flex-col items-center gap-4 py-4">
          <Palette className="h-6 w-6 stroke-blue-400" />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="text-white" />
          </Button>
        </div>
        <div className="p-4">
          <Button variant="ghost" size="icon" className="hover:bg-white/10 transition-colors">
            <HelpCircle className="text-white" />
          </Button>
        </div>
      </aside>
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onColorSubmit={handleColorSubmit}
      />
    </>
  );
}
