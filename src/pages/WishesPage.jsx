import React, { useState } from 'react';
import { Lamp } from 'lucide-react';

export default function WishesPage() {
  const [clicks, setClicks] = useState(0);
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const unlocked = clicks >= 3;

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-amber-800">Lâmpada dos desejos</h2>
          <p className="mt-2 text-amber-700">Clique 3x na lâmpada para liberar seu pedido especial da viagem.</p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setClicks((value) => value + 1)}
            className="rounded-full bg-amber-100 p-6 text-amber-700 transition hover:scale-105 hover:bg-amber-200"
            aria-label="Lâmpada dos desejos"
          >
            <Lamp className="h-12 w-12" />
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-amber-700">Cliques: {Math.min(clicks, 3)}/3</p>

        {unlocked && (
          <form onSubmit={submitWish} className="mt-6 space-y-3">
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
        )}
      </div>
    </div>
  );
}
