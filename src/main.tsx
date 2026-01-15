import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Overlay from "./components/Overlay";
import { AppProvider, ThemeProvider } from "./contexts";
import "./global.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
import AppRoutes from "./routes";

// Initialize the app with a fallback renderer while checking window type
const AppInitializer = () => {
  const [windowType, setWindowType] = useState<"main" | "overlay" | null>(null);
  const [monitorIndex, setMonitorIndex] = useState<number>(0);

  useEffect(() => {
    const initApp = async () => {
      try {
        const currentWindow = await getCurrentWindow(); // Await the promise
        const windowLabel = currentWindow.label;

        if (windowLabel?.startsWith("capture-overlay-")) {
          const parsedIndex = parseInt(windowLabel.split("-")[2], 10) || 0;
          setMonitorIndex(parsedIndex);
          setWindowType("overlay");
        } else {
          setWindowType("main");
        }
      } catch (error) {
        console.error("Error getting current window:", error);
        // Default to main window if there's an error
        setWindowType("main");
      }
    };

    initApp();
  }, []);

  if (windowType === "overlay") {
    return <Overlay monitorIndex={monitorIndex} />;
  }

  if (windowType === "main") {
    return (
      <ThemeProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ThemeProvider>
    );
  }

  // Fallback renderer while determining window type
  return <div>Loading...</div>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppInitializer />
  </React.StrictMode>
);
