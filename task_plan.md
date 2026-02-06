# Task Plan

## Phases
- [ ] Phase 0: Initialization
- [x] Phase 1: Blueprint (Vision & Logic)
- [x] Phase 2: Link (Connectivity)
- [x] Phase 3: Architect (The 3-Layer Build)
- [x] Phase 4: Stylize (Refinement & UI)
- [x] Phase 5: Trigger (Deployment)

## Goals
- Develop a Selenium Java to Playwright JS/TS converter.

## Checklists

### Phase 1: Blueprint
- [x] Define Data Schemas in `gemini.md`
- [x] Define Behavioral Rules
- [ ] confirm LLM choice (assuming Ollama/OpenAI based on previous context, but will start with scaffolding)

### Phase 2: Link
- [ ] Initialize Python Environment (`venv`)
- [ ] Install FastAPI, Uvicorn
- [ ] Create `server/` directory
- [ ] Verify Local File Write permissions

### Phase 3: Architect
- [ ] Create `architecture/flow_conversion.md` (SOP for how code is processed)
- [ ] **Layer 1**: Define the prompt template for Java -> Playwright.
- [ ] **Layer 3**: Build `tools/convert_code.py` (The Engine).
- [ ] **Layer 3**: Build `tools/write_file.py` (The IO).

### Phase 4: Stylize (The UI)
- [ ] Initialize Frontend: `npx create-vite@latest client --template react-ts`
- [ ] Setup Tailwind CSS
- [ ] Design "Input" Pane (Java Editor)
- [ ] Design "Output" Pane (TS Editor/Preview)
- [ ] Connect Frontend to Backend API

### Phase 5: Trigger
- [ ] Final end-to-end test (Java Snippet -> UI -> Backend -> File System).

