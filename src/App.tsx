import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { PlayerProvider } from "@/player/PlayerContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AlbumGrid from "@/components/AlbumGrid";
import ProjectPage from "@/pages/ProjectPage";
import StickyPlayer from "@/components/StickyPlayer";

export default function App() {
  const [hasEnteredPlayer, setHasEnteredPlayer] = useState(false);

  return (
    <LanguageProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Header />
          <div className="app-content">
            <Routes>
              <Route
                path="/"
                element={
                  hasEnteredPlayer ? (
                    <AlbumGrid />
                  ) : (
                    <Hero onOpenPlayer={() => setHasEnteredPlayer(true)} />
                  )
                }
              />
              <Route path="/project/:slug" element={<ProjectPage />} />
            </Routes>
          </div>
          <StickyPlayer />
        </BrowserRouter>
      </PlayerProvider>
    </LanguageProvider>
  );
}