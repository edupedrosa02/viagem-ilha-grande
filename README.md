# Viagem Ilha Grande

Aplicação React (Vite + Tailwind) com:

- contagem regressiva da viagem
- roteiro interativo por dia (atualizado)
- mapa real interativo (Leaflet/OpenStreetMap) com filtro por dia
- nova aba **Lâmpada dos desejos** com envio para banco (Neon via Vercel)

## Como subir o projeto

```bash
npm install
npm run dev
```

## Rotas

- `#/` → Roteiro
- `#/mapa` → Mapa do roteiro com pins por dia
- `#/desejos` → Lâmpada dos desejos

## Persistência de desejos (Vercel + Neon)

A API de desejos está em `api/wishes.js` e usa a variável de ambiente:

- `DATABASE_URL`

Fluxo:

1. Usuário clica 3x na lâmpada.
2. Campo de texto é liberado.
3. Botão **Enviar Desejo** faz `POST /api/wishes`.
4. Desejo é salvo na tabela `wishes` no Neon.

## Build e preview

```bash
npm run build
npm run preview
```
