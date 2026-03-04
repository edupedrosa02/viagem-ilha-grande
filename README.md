# Viagem Ilha Grande

Aplicação React (Vite + Tailwind) com:

- contagem regressiva da viagem
- roteiro interativo por dia
- segunda página com mapa interativo de pontos da viagem
Aplicação React (Vite + Tailwind) com contagem regressiva e roteiro interativo da viagem.

## Como subir o projeto

```bash
npm install
npm run dev
```

Depois, abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Rotas

- `#/` → Roteiro e countdown
- `#/mapa` → Mapa interativo com ícones dos lugares

> O app usa `HashRouter`, então funciona bem em deploy estático (GitHub Pages/Vercel sem regra extra de rewrite).

## Build e preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`: inicia ambiente local.
- `npm run build`: gera build de produção.
- `npm run preview`: serve a build localmente.
