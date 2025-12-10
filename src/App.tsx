import Navbar from "./components/Nav/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/Nav/Sidebar/AppSidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import { Toaster } from "@/components/ui/sonner";
import Payouts from "./components/Payouts/Payouts";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col w-full">
            <Navbar />
            <main className="p-4">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payouts" element={<Payouts />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <Toaster />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
