### Overview
- **Name**: Snake
- **Goal**: Create a working game of Snake clone
- **Primary users**: Me, for research purposes
- **Current status**: Planning

### Repository
- **Key dirs/files**
  - `electron/`: Electron main and preload process code
  - `src/renderer/`: Renderer UI and game code (TypeScript)
  - `public/`: Static assets and `index.html`
  - `tests/`: Optional unit tests for pure game logic
  - `package.json`: Scripts and dependencies
- **Entry points**
  - Electron main: `electron/main.ts`
  - Electron preload: `electron/preload.ts`
  - Renderer bootstrap: `src/renderer/main.ts`
  - HTML: `public/index.html`
  - Config: `tsconfig.json`, `vite.config.ts`, `electron-builder.yml` (when packaging)
  - Window: fixed size 480×520; resizable: false; background: dark

### Tech Stack
- **Desktop runtime**: Electron
- **Languages**: TypeScript
 - **Frameworks**: None (vanilla)
- **Rendering**: HTML5 Canvas
  - **Package manager**: npm
  - **Build tooling**: Vite (renderer dev/build), electron-builder (packaging)
  - **Data/State**: Local in-memory state; `localStorage` for high score
  - **Audio**: Web Audio API (synthesized tones; no external files)
  - **Cloud/Infra**: None

### Runbook (local)
- **Setup**
```bash
# Replace with your tooling
npm ci
```
- **Run**
```bash
# Starts Vite (renderer) and Electron
npm run dev
```
- **Test**
No tests initially (can add unit tests for logic later with Vitest)
- **Lint/Format**
```bash
npm run lint
npm run format
```
- **Build**
```bash
# Build renderer and package Electron app
npm run build
npm run package
```

### Environment
- **Env file**: None required
- **Critical vars**: None

### Coding Conventions
- **Style**: Prettier + ESLint (TypeScript rules)
- **Naming**: kebab-case files, PascalCase classes, camelCase variables/functions
- **Tests**: Optional Vitest for pure logic modules under `tests/`
- **Commits**: Conventional Commits
- **Error handling**: Guard clauses; avoid exceptions in game loop unless fatal

### Architecture Notes
- **Modules/boundaries**:
  - Main process: window creation, lifecycle
  - Preload: safe IPC bridge (if needed)
  - Renderer/game: game loop, input, state, rendering, persistence
- **Cross-cutting concerns**: none (no auth/i18n); minimal logging to console
- **State management**: simple module-level state; no external library
- **Important flows**:
  - Startup → create BrowserWindow → load `index.html` → renderer starts loop
  - Input → update direction → step snake → check collisions → render → repeat
  - Eat food → grow snake → increment score → maybe increase speed → persist high score
- Collision rules: solid walls (no wrap); self-collision ends the game
 - Tick rate: fixed at 8 updates/sec
 - Grid: 20×20 cells; 20 px per cell (canvas 400×400 logical px; scale for devicePixelRatio)
 - Controls: Arrow keys and WASD for direction; P = pause/resume; R/Enter = restart; M = mute/unmute
 - Scoring: +1 per food; high score saved in localStorage
 - Audio cues: very short low-pitched squeaky tick on movement; distinct eat and crash sounds
  - Direction reversal: disallowed (no 180° turns within a tick)
  - Starting length: 1 segment
  - Food spawn: any empty cell (no minimum distance from head)
  - Starting position: center of grid
  - Starting direction: left

### APIs and Integrations
- **Internal endpoints**: none
- **External services**: none
- **Auth**: none

### Data Model (brief)
- **Entities**:
  - Grid: width, height, cellSize
  - Snake: list of segments, direction, pending growth
  - Food: position
  - Score: current, highScore
- **Relationships**: snake occupies grid cells; food spawns on empty cell

### Constraints & NFRs
- **Performance**: target 60 FPS; logic tick decoupled from render where possible
- **Security**: Electron `contextIsolation: true`, `nodeIntegration: false` in renderer; use preload if IPC is needed
- **Accessibility**: keyboard-only playable; sufficient color contrast
- **Browser/OS support**: Windows 10+ desktop (Electron)

### Current Priorities
- [ ] Scaffold Electron (main/preload) and Vite renderer
- [ ] Render canvas and draw grid
- [ ] Implement game loop and fixed tick update
- [ ] Snake movement and input (Arrow keys + WASD)
- [ ] Food spawning and growth
- [ ] Collision detection (self and walls)
- [ ] Score + high score in `localStorage`
- [ ] Implement audio cues (move/eat/crash) with Web Audio API and mute toggle
- [ ] Pause/restart controls
- [ ] Package Windows build

### Known Issues / Gotchas
- High-DPI scaling can blur Canvas; account for devicePixelRatio
- Keyboard focus must be on window for input
- Do not block the render thread; keep updates small per tick

### Non-goals
- Multiplayer, networking, servers
- Backend APIs or databases
- Advanced graphics/shaders
- Cross-platform packaging (Windows only for now)

### Glossary
- **Main process**: Electron process that manages app lifecycle and windows
- **Renderer**: Browser-like window rendering UI and running the game
- **Preload**: Script injected with limited, safe access to Node/IPC

### Assistant Preferences (how to help)
- **Prefer**: Zero deps where possible; simple, readable TypeScript; small modules
- **Avoid**: Over-engineering, heavy frameworks, global mutable state scattered across files
- **When unsure**: Ask only if it changes gameplay or user experience; otherwise choose the simplest default
- **Output format**: Propose focused edits with small diffs; use fenced code blocks for commands
