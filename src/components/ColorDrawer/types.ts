import { ColorInput } from "@/lib/contexts/ColorContext";

export interface ColorDrawerProps {
  color: ColorInput | null;
  isOpen: boolean;
  onClose: () => void;
}
