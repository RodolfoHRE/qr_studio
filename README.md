<div align="center">

<img src="src/img/png/qr_studio_logo_readme.png" alt="QR Studio" width="360" />

**Gerador de QR codes customizáveis — desktop, com interface web.**

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](#status)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vite.dev)

</div>

---

Crie QR codes personalizados — escolha o tipo de conteúdo, ajuste cores e estilo,
e exporte em PNG ou SVG. Distribuído como aplicativo desktop para Windows e Linux,
sem precisar instalar Node, Python ou qualquer dependência.

## Status

🚧 **Em desenvolvimento.** Construído de forma incremental. O app web está
completo (React + Vite): os cinco tipos de conteúdo, estilização avançada e
exportação PNG/SVG já funcionam. O empacotamento desktop com **Tauri v2** já
está integrado; a primeira release com binários sai via GitHub Actions ao
publicar uma tag `v*`.

A identidade visual já está aplicada: paleta azul-profundo → teal, tema escuro
por padrão com alternância para o claro, e preview do QR em tempo real.

## Funcionalidades

Tipos de conteúdo:

- [x] URL
- [x] Texto livre
- [x] Wi-Fi
- [x] E-mail (com assunto e corpo)
- [x] Contato (vCard)

Customização:

- [x] Cor dos pontos e do fundo
- [x] Tamanho do QR (150–400px)
- [x] Estilo dos pontos e das esquinas
- [x] Cores das esquinas (independentes)
- [x] Gradiente linear
- [x] Logo central com tamanho ajustável

Export:

- [x] Download em PNG
- [x] Download em SVG

Interface:

- [x] Identidade visual (paleta da marca, logo)
- [x] Tema escuro / claro com alternância
- [x] Preview em tempo real (debounce ~300ms)

> A estrutura base e o fluxo de estado já estão prontos. As funcionalidades acima
> serão marcadas conforme forem implementadas.

## Stack

| Camada     | Tecnologia            |
| ---------- | --------------------- |
| Frontend   | React + Vite          |
| Geração QR | `qr-code-styling`     |
| Desktop    | Tauri v2              |

## Rodar localmente

Requer [Node.js](https://nodejs.org/) 18+.

```bash
git clone https://github.com/RodolfoHRE/qr_studio
cd qr_studio
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Download

Instaladores para Windows (`.exe`) e Linux (`.AppImage` e `.deb`) são publicados
em [Releases](https://github.com/RodolfoHRE/qr_studio/releases/latest), gerados
pelo GitHub Actions a cada tag `v*`. A página de download fica em `docs/`
(GitHub Pages): **Settings → Pages → Deploy from branch → `main` → `/docs`**.

Publicar uma versão:

```bash
git tag v0.1.0 && git push origin v0.1.0
```

## Licença

[MIT](LICENSE)
