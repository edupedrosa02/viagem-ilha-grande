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
    <div className="relative mx-auto max-w-3xl px-4 py-10">
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
      </div>

      {unlocked && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-slate-900/55 p-3 backdrop-blur-[2px] md:flex md:items-center md:justify-center md:p-4">
          <div
            className="relative mx-auto w-full max-w-4xl rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-50 p-4 shadow-2xl md:p-8"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="relative grid items-start gap-6 md:grid-cols-[1fr_1.2fr]">
              <div className="relative flex justify-center">
                {!genieImageFailed ? (
                  <img
                    src={currentGenieSrc}
                    alt="Gênio da lâmpada"
                    className="max-h-[300px] w-auto object-contain sm:max-h-[380px] md:max-h-[440px]"
                    onError={handleGenieImageError}
                  />
                ) : (
                  <p className="rounded-xl bg-white/80 p-4 text-center text-sm text-indigo-700">
                    Não consegui carregar a imagem do gênio. Coloque o arquivo em <code>public/genio.png</code>.
                  </p>
                )}

                <div className="absolute left-1/2 top-2 w-[90%] max-w-xs -translate-x-1/2 rounded-lg bg-white/90 px-3 py-2 text-center text-sm font-semibold text-slate-700 shadow sm:text-base md:left-[72%] md:top-12 md:w-80 md:-translate-x-0">
                  O que você gostaria que acontecesse nessa viagem?
                  <span className="absolute -left-3 top-10 hidden h-0 w-0 border-b-[10px] border-r-[14px] border-t-[10px] border-b-transparent border-r-white/90 border-t-transparent md:block" />
                </div>
              </div>

              <form onSubmit={submitWish} className="space-y-3">
                <label htmlFor="wish" className="block text-lg font-semibold text-indigo-900">
                  Seu desejo
                </label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(event) => setWish(event.target.value)}
                  placeholder="Escreva aqui..."
                  className="min-h-44 w-full rounded-2xl border-2 border-amber-300 bg-white px-5 py-4 text-base text-slate-700 outline-none ring-amber-200 focus:ring sm:min-h-52 sm:text-lg"
                />
                <div className="sticky bottom-0 flex flex-wrap items-center gap-3 rounded-xl bg-white/90 p-2">
                  <button
                    type="submit"
                    disabled={loading || !wish.trim()}
                    className="rounded-xl bg-amber-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-lg"
                  >
                    {loading ? 'Enviando...' : 'Enviar Desejo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setClicks(0)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Fechar
                  </button>
                </div>
                {status && <p className="text-sm text-slate-600">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
