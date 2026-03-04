# Viagem Ilha Grande

Aplicação React (Vite + Tailwind) com:

- contagem regressiva da viagem
- roteiro interativo por dia
- segunda página com mapa real interativo (Leaflet/OpenStreetMap)
- filtro por dia para mostrar apenas os pins do dia selecionado

## Como subir o projeto

```bash
npm install
npm run dev
```

Depois, abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Rotas

- `#/` → Roteiro e countdown
- `#/mapa` → Mapa real interativo + filtro por dia (ex.: 14/04 mostra só os pontos desse dia)

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


## Vercel: erro de `package.json` inválido

Se o build acusar `Expected ',' or '}' after property value in JSON`, normalmente o `package.json`
foi salvo com caracteres inválidos (ex.: `\n` literal copiado/colado no arquivo).

Checklist rápido:

1. Abra o `package.json` no GitHub e confirme que ele está em JSON puro (sem barras invertidas antes de quebras de linha).
2. Rode localmente: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('ok')"`.
3. Faça novo deploy no Vercel após o commit com `package.json` válido.
