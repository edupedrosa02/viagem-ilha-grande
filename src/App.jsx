import React from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';

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

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <h1 className="text-sm font-bold uppercase tracking-wider text-slate-700 md:text-base">Viagem Ilha Grande</h1>
            <nav className="flex items-center gap-2">
              <TabLink to="/">Roteiro</TabLink>
              <TabLink to="/mapa">Mapa</TabLink>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
        </Routes>

        <footer className="py-8 text-center text-sm text-slate-400">
          <p>Feito com ❤️ para a mulher da Minha Vida</p>
        </footer>
      </div>
    </HashRouter>
  );
}
