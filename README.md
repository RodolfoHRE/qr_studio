<div align="center">

<img src="src/img/png/qr_studio_logo_readme.png" alt="QR Studio" width="360" />

**Gerador de QR codes customizáveis — desktop, com interface web.**

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vite.dev)

</div>

---

Crie QR codes personalizados — escolha o tipo de conteúdo, ajuste cores e estilo,
e exporte em PNG ou SVG. Distribuído como aplicativo desktop para Windows e Linux,
sem precisar instalar Node, Python ou qualquer dependência.

👉 **[Baixe agora na página oficial](https://rodolfohre.github.io/qr_studio/)** ou
direto nas [Releases](https://github.com/RodolfoHRE/qr_studio/releases/latest).

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

- [x] Identidade visual (paleta azul-profundo → teal, logo)
- [x] Tema escuro / claro com alternância
- [x] Preview em tempo real (debounce ~300ms)

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

Baixe o instalador para o seu sistema na
**[página oficial](https://rodolfohre.github.io/qr_studio/)** ou direto nas
[Releases](https://github.com/RodolfoHRE/qr_studio/releases/latest):

- **Windows** — `.exe` (instalador NSIS)
- **Linux** — `.AppImage` e `.deb`

Os binários são gerados automaticamente pelo GitHub Actions. Nenhuma dependência
de runtime — instale e use.

## Licença

[MIT](LICENSE)
