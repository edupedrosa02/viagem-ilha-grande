import React, { useState } from 'react';
import { Anchor, Camera, UtensilsCrossed, Waves, Mountain, Ship } from 'lucide-react';

const spots = [
  {
    id: 'abraao',
    name: 'Vila do Abraão',
    tip: 'Base da viagem, restaurantes e saída dos passeios.',
    top: '58%',
    left: '36%',
    icon: Anchor,
  },
  {
    id: 'julia',
    name: 'Praia da Júlia',
    tip: 'Caminhada curta para começar o dia.',
    top: '54%',
    left: '32%',
    icon: Waves,
  },
  {
    id: 'lopes',
    name: 'Lopes Mendes',
    tip: 'Mar cristalino e praia longa para relaxar.',
    top: '70%',
    left: '70%',
    icon: Mountain,
  },
  {
    id: 'lagoa-azul',
    name: 'Lagoa Azul',
    tip: 'Parada clássica para mergulho e fotos.',
    top: '22%',
    left: '22%',
    icon: Camera,
  },
  {
    id: 'feiticeira',
    name: 'Praia da Feiticeira',
    tip: 'Perfeita para incluir no roteiro de barco.',
    top: '48%',
    left: '52%',
    icon: Ship,
  },
  {
    id: 'lua-e-mar',
    name: 'Lua e Mar',
    tip: 'Nosso jantar romântico favorito.',
    top: '60%',
    left: '40%',
    icon: UtensilsCrossed,
  },
];

export default function MapPage() {
  const [activeSpot, setActiveSpot] = useState(spots[0]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Mapa Interativo</h2>
        <p className="mt-2 text-slate-500">Clique nos ícones para explorar os lugares do nosso roteiro.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/Ilha_Grande%2C_Rio_de_Janeiro%2C_Brazil.jpg"
            alt="Mapa da Ilha Grande"
            className="h-full min-h-[420px] w-full object-cover"
          />
          {spots.map((spot) => {
            const Icon = spot.icon;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveSpot(spot)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-2 shadow-md transition ${
                  activeSpot.id === spot.id
                    ? 'border-blue-600 bg-blue-600 text-white scale-110'
                    : 'border-white bg-white/90 text-blue-700 hover:scale-110'
                }`}
                style={{ top: spot.top, left: spot.left }}
                aria-label={spot.name}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700">Lugar selecionado</h3>
          <p className="mt-3 text-2xl font-bold text-slate-800">{activeSpot.name}</p>
          <p className="mt-2 text-slate-600">{activeSpot.tip}</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-500">
            <li>• Use no celular para planejar o dia rápido.</li>
            <li>• Dá para adicionar horários por ponto depois.</li>
            <li>• Se quiser, próximo passo é trocar por mapa real (Leaflet).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
