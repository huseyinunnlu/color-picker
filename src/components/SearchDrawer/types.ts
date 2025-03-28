export interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSubmit: (color: string) => void;
}
