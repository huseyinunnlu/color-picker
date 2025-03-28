import { ColorProvider, useColor } from "@/lib/contexts/ColorContext";
import ColorDrawer from "@/components/ColorDrawer";
import Content from "@/components/Content";
import Sidebar from "@/components/Layouts/Sidebar";

function AppContent() {
  const { selectedColor, isDrawerOpen, closeDrawer } = useColor();

  return (
    <main className="h-screen bg-zinc-50 flex">
      <Sidebar />
      <Content />
      <ColorDrawer color={selectedColor} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </main>
  );
}

export default function App() {
  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  );
}
