import { useState } from "react";
import { Copy, X } from "lucide-react";

import { ColorInput } from "@/lib/contexts/ColorContext";
import { cn } from "@/lib/utils";
import { generateColorShades, hexToRgb, hexToRgba, toHexColor } from "@/lib/utils/color";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ColorDrawerProps } from "./types";

interface ColorFormat {
  label: string;
  value: string;
}

export default function ColorDrawer({ color, isOpen, onClose }: ColorDrawerProps) {
  const { lighterShades, darkerShades } = color
    ? generateColorShades(color)
    : { lighterShades: [], darkerShades: [] };

  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Include the original color in its original format
  const allShades = [...lighterShades, ...(color ? [color] : []), ...darkerShades];

  const handleCopyColor = (colorValue: string) => {
    navigator.clipboard.writeText(colorValue);
    setCopiedColor(colorValue);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const getColorFormats = (shade: string): ColorFormat[] => {
    // If this is the original selected color and it's in RGB/RGBA format, preserve it
    if (shade === color && (shade.startsWith("rgb(") || shade.startsWith("rgba("))) {
      return [
        { label: "Original", value: shade },
        { label: "HEX", value: toHexColor(shade as ColorInput) },
        ...(shade.startsWith("rgb(")
          ? [{ label: "RGBA", value: shade.replace("rgb", "rgba").replace(")", ", 1)") }]
          : []),
      ];
    }

    // For generated shades, show all formats
    return [
      { label: "HEX", value: shade },
      { label: "RGB", value: hexToRgb(shade) },
      { label: "RGBA", value: hexToRgba(shade) },
    ];
  };

  return (
    <TooltipProvider>
      <Drawer open={isOpen} onOpenChange={onClose} direction="right">
        <DrawerContent className="bg-zinc-50 max-h-screen overflow-y-auto">
          <DrawerHeader className="border-b border-zinc-200">
            <DrawerTitle className="text-zinc-900">Color Details</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 hover:bg-zinc-200"
              >
                <X className="h-4 w-4 stroke-zinc-900" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 space-y-6">
            <div
              className="h-32 w-full rounded-lg shadow-sm"
              style={{ backgroundColor: color || undefined }}
            />

            <div className="space-y-6">
              {color && (
                <>
                  <div>
                    <p className="text-sm font-medium mb-2 text-zinc-900">Selected Color</p>
                    <div className="space-y-2">
                      {getColorFormats(color).map(({ label, value }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-500 w-12">{label}</span>
                          <code className="flex-1 rounded bg-zinc-200 px-2 py-1 text-zinc-900">
                            {value}
                          </code>
                          <Tooltip open={copiedColor === value}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="bg-zinc-900 hover:bg-zinc-700"
                                onClick={() => handleCopyColor(value)}
                              >
                                <Copy className="h-4 w-4 text-white" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copied!</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 gap-4">
                      {allShades.map((shade) => {
                        const isSelected = shade === color;
                        return (
                          <div
                            key={shade}
                            className={cn(
                              "space-y-2 p-2 transition-all",
                              isSelected && "bg-blue-500/5 border border-blue-500/20 rounded-lg"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded border border-zinc-200/50",
                                  isSelected && "ring-2 ring-blue-500"
                                )}
                                style={{ backgroundColor: shade }}
                              />
                              <span className="text-xs font-medium text-zinc-500">
                                {isSelected ? "Selected" : "Shade"}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {getColorFormats(shade).map(({ label, value }) => (
                                <div key={label} className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-zinc-500 w-12">
                                    {label}
                                  </span>
                                  <code className="flex-1 rounded bg-zinc-200 px-2 py-1 text-zinc-900">
                                    {value}
                                  </code>
                                  <Tooltip open={copiedColor === value}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-zinc-900 hover:bg-zinc-700"
                                        onClick={() => handleCopyColor(value)}
                                      >
                                        <Copy className="h-4 w-4 text-white" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Copied!</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
}
