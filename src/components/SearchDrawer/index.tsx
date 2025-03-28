import { ChangeEvent, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { validateAndFormatColor } from "@/lib/utils/color";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { SearchDrawerProps } from "./types";

export default function SearchDrawer({ isOpen, onClose, onColorSubmit }: SearchDrawerProps) {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedColor = !color.startsWith("#") && !color.startsWith("rgb") ? `#${color}` : color;
    const validatedColor = validateAndFormatColor(processedColor);

    if (validatedColor) {
      onColorSubmit(validatedColor);
      setColor("");
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    setError(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-screen">
        <DrawerHeader className="border-b border-zinc-200">
          <DrawerTitle>Search Color</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter color (e.g. fff, #ffffff, rgb(255,255,255))"
                value={color}
                onChange={handleColorChange}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <p className="text-sm text-red-500">
                  Please enter a valid color (e.g. fff, #ffffff, rgb(255,255,255))
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
