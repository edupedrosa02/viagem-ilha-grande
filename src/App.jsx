import React, { useEffect, useState } from 'react';
import { Heart, MapPin, Clock, Sun, Anchor, Camera, Coffee } from 'lucide-react';

const TRIP_DATE = new Date('2026-04-14T00:00:00');

function calculateTimeLeft() {
  const difference = +TRIP_DATE - +new Date();

  if (difference <= 0) return {};

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const itinerary = [
    {
      day: 1,
      date: '14/04 (Terça)',
      title: 'Chegada e Relaxamento',
      icon: <Anchor className="h-6 w-6 text-blue-500" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>09h:</strong> Chegada na Vila, deixar malas (early check-in). Caminhada leve até a
            Praia da Júlia e Abraãozinho.
          </p>
          <p>
            <strong>Almoço:</strong> Lua e Mar (peixe fresco e clima romântico).
          </p>
          <p>
            <strong>Tarde:</strong> Descanso, centrinho e sorvete.
          </p>
          <p>
            <strong>Jantar:</strong> Canoa Café Lounge (ótimo pra vinho).
          </p>
        </div>
      ),
    },
    {
      day: 2,
      date: '15/04 (Quarta)',
      title: 'Meia Volta à Ilha',
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>10h às 16h30:</strong> Passeio pela Lagoa Azul, Lagoa Verde, Praia do Amor e Praia
            da Feiticeira.
          </p>
          <p>
            <strong>Noite:</strong> Banho, descanso e jantar no Bonito Bar e Restaurante (clima mais
            descontraído).
          </p>
        </div>
      ),
    },
    {
      day: 3,
      date: '16/04 (Quinta)',
      title: 'Paraíso de Lopes Mendes',
      icon: <Heart className="h-6 w-6 text-red-500" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>08h30:</strong> Barco-táxi até Pouso + trilha moderada/leve até Lopes Mendes (ir
            cedo pro mar estar calmo).
          </p>
          <p>
            <strong>Almoço:</strong> Marola (ótimo custo-benefício).
          </p>
          <p>
            <strong>Tarde:</strong> Descanso e pôr do sol no píer.
          </p>
          <p>
            <strong>Jantar:</strong> Dom Mario (tradicional e elogiado).
          </p>
        </div>
      ),
    },
    {
      day: 4,
      date: '17/04 (Sexta)',
      title: 'Ilhas Paradisíacas',
      icon: <Camera className="h-6 w-6 text-emerald-500" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>10h30 às 17h30:</strong> Passeio Ilhas Paradisíacas.
          </p>
          <p>
            <strong>Jantar:</strong> Repetir o restaurante favorito ou testar algo novo na vila.
          </p>
        </div>
      ),
    },
    {
      day: 5,
      date: '18/04 (Sábado)',
      title: 'Dia Coringa',
      icon: <MapPin className="h-6 w-6 text-purple-500" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>Livre:</strong> Repetir a praia que mais gostamos, fazer trilha até Praia Preta (20
            min) ou andar de caiaque.
          </p>
          <p>
            <strong>Jantar de Despedida:</strong> Retornar ao Lua e Mar ou Canoa Café Lounge.
          </p>
        </div>
      ),
    },
    {
      day: 6,
      date: '19/04 (Domingo)',
      title: 'Despedida',
      icon: <Coffee className="h-6 w-6 text-amber-600" />,
      details: (
        <div className="space-y-2">
          <p>
            <strong>Manhã:</strong> Café longo na pousada e último mergulho rápido na Praia do Abraão.
          </p>
          <p>
            <strong>15h:</strong> Preparar saída.
          </p>
          <p>
            <strong>17h:</strong> Barco para Angra.
          </p>
          <p>
            <strong>19h30:</strong> Rodoviária.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-blue-900 md:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://angradosreisturismo.com.br/cdn/shop/products/Lopes-mendes2_1600x.jpg?v=1583933105')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
            Ilha Grande
            <Heart className="animate-pulse fill-red-400 text-red-400" />
          </h1>
          <p className="text-xl font-light text-blue-100 drop-shadow-md md:text-2xl">
            Nossa próxima grande aventura
          </p>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-12 max-w-4xl px-4 md:-mt-16">
        <div className="flex flex-col items-center rounded-2xl border border-blue-50 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-6 flex items-center gap-2 text-blue-800">
            <Clock className="h-5 w-5" />
            <h2 className="text-lg font-semibold uppercase tracking-wider">Contagem Regressiva</h2>
          </div>
          <div className="flex w-full justify-center gap-4 md:gap-8">
            {Object.keys(timeLeft).length ? (
              Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600 shadow-inner md:h-24 md:w-24 md:text-4xl">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <span className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500 md:text-sm">
                    {unit}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-2xl font-bold text-blue-600">Chegou o grande dia! 🎉</div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-800">Nosso Roteiro</h2>
          <p className="text-slate-500">Clique nos dias para ver os detalhes da nossa viagem.</p>
        </div>

        <div className="space-y-4">
          {itinerary.map((item) => (
            <div
              key={item.day}
              className={`cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
                activeDay === item.day ? 'border-blue-300 ring-2 ring-blue-50' : 'border-slate-100'
              }`}
              onClick={() => setActiveDay(activeDay === item.day ? null : item.day)}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-3 ${activeDay === item.day ? 'bg-blue-50' : 'bg-slate-50'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-semibold text-slate-400">
                      DIA {item.day} • {item.date}
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">{item.title}</h3>
                  </div>
                </div>
                <div
                  className={`transform text-slate-400 transition-transform duration-300 ${
                    activeDay === item.day ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </div>
              </div>

              <div
                className={`bg-slate-50 px-5 transition-all duration-300 ease-in-out ${
                  activeDay === item.day ? 'max-h-[600px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <div className="text-sm leading-relaxed text-slate-600 md:text-base">{item.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8 text-center text-sm text-slate-400">
        <p>Feito com ❤️ para a mulher da Minha Vida</p>
      </div>
    </div>
  );
}
