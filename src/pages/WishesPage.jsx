import React, { useMemo, useState } from 'react';
import MagicLampIcon from '../components/MagicLampIcon';

const GENIE_IMAGE_SOURCES = [
  '/genio.png',
  'https://i.imgur.com/i6ohs0W.png',
  'https://i.imgur.com/i6ohs0W.jpg',
];

export default function WishesPage() {
  const [clicks, setClicks] = useState(0);
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [genieImageFailed, setGenieImageFailed] = useState(false);

  const unlocked = clicks >= 3;
  const currentGenieSrc = useMemo(() => GENIE_IMAGE_SOURCES[imageIndex], [imageIndex]);

  async function submitWish(event) {
    event.preventDefault();
    if (!wish.trim()) return;

    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wish: wish.trim() }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar desejo');
      }

      setWish('');
      setStatus('Desejo enviado com sucesso ✨');
    } catch {
      setStatus('Não foi possível enviar agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleGenieImageError() {
    const hasFallback = imageIndex < GENIE_IMAGE_SOURCES.length - 1;
    if (hasFallback) {
      setImageIndex((value) => value + 1);
      return;
    }

    setGenieImageFailed(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-indigo-50 p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-amber-800">Lâmpada dos desejos</h2>
          <p className="mt-2 text-amber-700">Clique 3x na lâmpada para invocar o gênio e fazer seu pedido.</p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setClicks((value) => value + 1)}
            className="rounded-full bg-amber-100 p-5 text-amber-700 transition hover:scale-105 hover:bg-amber-200"
            aria-label="Lâmpada dos desejos"
          >
            <MagicLampIcon className="h-16 w-16" />
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-amber-700">Cliques: {Math.min(clicks, 3)}/3</p>

        {unlocked && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-indigo-200 bg-white/80 p-4">
              {!genieImageFailed ? (
                <img
                  src={currentGenieSrc}
                  alt="Gênio da lâmpada"
                  className="mx-auto max-h-80 w-auto transition-opacity duration-700"
                  onError={handleGenieImageError}
                />
              ) : (
                <p className="text-center text-sm text-indigo-700">
                  Não consegui carregar a imagem do gênio. Coloque o arquivo em <code>public/genio.png</code>.
                </p>
              )}
            </div>

            <form onSubmit={submitWish} className="space-y-3">
              <textarea
                value={wish}
                onChange={(event) => setWish(event.target.value)}
                placeholder="O que você gostaria que acontecesse nessa viagem?"
                className="min-h-28 w-full rounded-xl border border-amber-300 bg-white px-4 py-3 text-slate-700 outline-none ring-amber-200 focus:ring"
              />
              <button
                type="submit"
                disabled={loading || !wish.trim()}
                className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Enviando...' : 'Enviar Desejo'}
              </button>
              {status && <p className="text-sm text-slate-600">{status}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
