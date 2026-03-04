import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const DAY_OPTIONS = [
  { id: 'all', label: 'Todos os dias' },
  { id: '14', label: 'Dia 14/04 (Terça)' },
  { id: '15', label: 'Dia 15/04 (Quarta)' },
  { id: '16', label: 'Dia 16/04 (Quinta)' },
  { id: '17', label: 'Dia 17/04 (Sexta)' },
  { id: '18', label: 'Dia 18/04 (Sábado)' },
  { id: '19', label: 'Dia 19/04 (Domingo)' },
];

const spots = [
  {
    id: 'abraao',
    name: 'Vila do Abraão',
    tip: 'Chegada, centrinho e ponto de saída de passeios.',
    position: [-23.1406, -44.166],
    days: ['14', '18', '19'],
  },
  {
    id: 'julia',
    name: 'Praia da Júlia / Abraãozinho',
    tip: 'Passeio leve no dia de chegada.',
    position: [-23.139, -44.1594],
    days: ['14'],
  },
  {
    id: 'lagoa-azul',
    name: 'Lagoa Azul',
    tip: 'Parada clássica para mergulho na meia volta.',
    position: [-23.0992, -44.2015],
    days: ['15'],
  },
  {
    id: 'feiticeira',
    name: 'Praia da Feiticeira',
    tip: 'Uma das paradas do passeio de barco.',
    position: [-23.1642, -44.1552],
    days: ['15'],
  },
  {
    id: 'lopes',
    name: 'Lopes Mendes',
    tip: 'Dia de praia principal com trilha/barco-táxi.',
    position: [-23.1777, -44.1407],
    days: ['16'],
  },
  {
    id: 'ilhas',
    name: 'Ilhas Paradisíacas',
    tip: 'Roteiro de ilhas no passeio do dia 17.',
    position: [-23.0984, -44.1802],
    days: ['17'],
  },
  {
    id: 'preta',
    name: 'Praia Preta',
    tip: 'Opção de trilha curta no dia coringa.',
    position: [-23.1468, -44.1714],
    days: ['18'],
  },
];

function formatDays(days) {
  return days.map((day) => `${day}/04`).join(', ');
}

export default function MapPage() {
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedSpotId, setSelectedSpotId] = useState(spots[0].id);

  const visibleSpots = useMemo(() => {
    if (selectedDay === 'all') return spots;
    return spots.filter((spot) => spot.days.includes(selectedDay));
  }, [selectedDay]);

  useEffect(() => {
    if (!visibleSpots.some((spot) => spot.id === selectedSpotId) && visibleSpots.length > 0) {
      setSelectedSpotId(visibleSpots[0].id);
    }
  }, [selectedSpotId, visibleSpots]);

  const activeSpot =
    visibleSpots.find((spot) => spot.id === selectedSpotId) ?? visibleSpots[0] ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Mapa Interativo Real</h2>
        <p className="mt-2 text-slate-500">Selecione o dia para mostrar somente os lugares daquele roteiro.</p>
      </div>

      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="day-filter" className="mb-2 block text-sm font-semibold text-slate-700">
          Filtrar pins por dia
        </label>
        <select
          id="day-filter"
          value={selectedDay}
          onChange={(event) => setSelectedDay(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none ring-blue-200 focus:ring"
        >
          {DAY_OPTIONS.map((day) => (
            <option key={day.id} value={day.id}>
              {day.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <MapContainer
            center={[-23.135, -44.17]}
            zoom={12}
            scrollWheelZoom
            className="h-[450px] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {visibleSpots.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={spot.position}
                radius={activeSpot?.id === spot.id ? 11 : 8}
                pathOptions={{
                  color: activeSpot?.id === spot.id ? '#1d4ed8' : '#334155',
                  fillColor: activeSpot?.id === spot.id ? '#2563eb' : '#64748b',
                  fillOpacity: 0.9,
                }}
                eventHandlers={{ click: () => setSelectedSpotId(spot.id) }}
              >
                <Popup>
                  <strong>{spot.name}</strong>
                  <br />
                  {spot.tip}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700">Lugar selecionado</h3>
          {activeSpot ? (
            <>
              <p className="mt-3 text-2xl font-bold text-slate-800">{activeSpot.name}</p>
              <p className="mt-2 text-slate-600">{activeSpot.tip}</p>
              <p className="mt-4 text-sm text-slate-500">Dias: {formatDays(activeSpot.days)}</p>
            </>
          ) : (
            <p className="mt-3 text-slate-600">Sem pontos para o dia selecionado.</p>
          )}

          <div className="mt-5 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pins visíveis ({visibleSpots.length})
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {visibleSpots.map((spot) => (
                <li key={spot.id}>• {spot.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
