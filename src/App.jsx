import React from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import WishesPage from './pages/WishesPage';

function TabLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition ${
          isActive ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function SpotifyPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.1)] backdrop-blur">
      <div className="mx-auto max-w-5xl">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/4leiIdGX484a2pqFXO0s8k?utm_source=generator&autoplay=1"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Playlist da viagem no Spotify"
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans pb-[190px] md:pb-[200px]">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wider text-slate-700 md:text-base">Viagem Ilha Grande</h1>
            <nav className="flex items-center gap-2">
              <TabLink to="/">Roteiro</TabLink>
              <TabLink to="/mapa">Mapa</TabLink>
              <TabLink to="/desejos">Lâmpada</TabLink>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/desejos" element={<WishesPage />} />
        </Routes>

        <footer className="py-8 text-center text-sm text-slate-400">
          <p>Feito com ❤️ para a mulher da Minha Vida</p>
        </footer>

        <SpotifyPlayer />
      </div>
    </HashRouter>
  );
}
