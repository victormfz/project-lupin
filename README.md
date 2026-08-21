# Discord Clone App

Aplicativo desktop estilo Discord, construído com Electron e Node.js.

## Estrutura do projeto

```
src/
  main/             # Processo principal (Node.js/Electron) — janelas, IPC, updater
    windows/        # Criação e configuração de janelas
    ipc/            # Handlers IPC organizados por domínio
  preload/          # Ponte segura entre main e renderer (contextBridge)
  renderer/         # App React (Vite)
    index.html      # Entry HTML servido pelo Vite
    src/
      main.jsx       # Entry point React
      App.jsx         # Componente raiz
      components/     # Componentes React
      styles/         # CSS
    dist/           # Build de produção do React (gerado, não versionar)
  shared/           # Código compartilhado entre main e preload (ex: nomes de canais IPC)
assets/             # Ícones, imagens
build/              # Recursos de build (ícones do instalador, etc.)
config/             # Configurações adicionais
vite.config.js      # Configuração do Vite para o renderer
```

## Por que essa arquitetura

- **contextIsolation + sandbox habilitados, nodeIntegration desabilitado**: o renderer (React) nunca tem acesso direto ao Node.js, apenas à API controlada exposta em `preload/index.js` via `window.api`. É o padrão de segurança recomendado atualmente pelo Electron.
- **Canais IPC centralizados** em `shared/ipcChannels.js`: evita strings soltas e erros de digitação entre main e preload.
- **Handlers IPC organizados por domínio** (`windowControls.js`, `appHandlers.js`): fica fácil adicionar `authHandlers.js`, `chatHandlers.js`, `voiceHandlers.js` conforme o app cresce.
- **Janela sem moldura (frame: false)** com titlebar React customizada: para reproduzir a estética estilo Discord.
- **Vite** cuida do build/HMR do React; em dev o Electron carrega `http://localhost:5173`, em produção carrega o `dist/index.html` gerado pelo Vite.

## Scripts

- `npm install` — instala dependências
- `npm run dev` — roda Vite + Electron juntos, com hot reload do React e DevTools abertas
- `npm run build` — builda o React e gera os instaladores com electron-builder

## Próximos passos sugeridos

1. Adicionar biblioteca de estado (Context API, Zustand ou Redux) conforme o app crescer.
2. Adicionar camada de backend/API (auth, mensagens, WebSocket para tempo real).
3. Criar handlers IPC para autenticação e chat.
4. Adicionar ícones em `build/` para o electron-builder.
5. Antes de gerar build de produção, apertar a CSP em `src/renderer/index.html` (remover `unsafe-eval` e o `connect-src` do Vite dev server).
