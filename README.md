# Selenium (Java) → Playwright (TS/JS) Converter

A tool with a web UI for converting Selenium/TestNG Java test code into idiomatic Playwright TypeScript (or JavaScript) — not a literal line-by-line translation, but a refactor into modern Playwright patterns (`await expect`, auto-waits instead of `Thread.sleep`, etc).

## What it does

1. **Paste** a Selenium Java test into the UI.
2. **Convert** — the backend runs the code through a two-pass pipeline:
   - **Pass 1 (deterministic):** regex-based replacement of common Selenium patterns and imports (e.g. `Thread.sleep` → `page.waitForTimeout`).
   - **Pass 2 (refactor):** rewrites the remaining logic into idiomatic Playwright TypeScript, adding standard imports (`import { test, expect } from '@playwright/test'`) if missing.
3. **Review & save** — converted code is shown in the UI and written to disk (never overwriting an existing file without an explicit force flag).

## Stack

- **Backend:** Python, FastAPI
- **Frontend:** React 19 + TypeScript (Vite), Tailwind CSS
- **Conversion engine:** `tools/convert_code.py` (regex pass) + `tools/write_file.py` (safe file output)

## Project structure

```
server/
  main.py              # FastAPI app — /convert endpoint
tools/
  convert_code.py      # Conversion engine (regex + refactor pass)
  write_file.py         # Safe file-write logic (never silently overwrites)
client/
  src/App.tsx           # Input (Java) / output (TS) UI
architecture/
  flow_conversion.md    # SOP describing the conversion pipeline step by step
```

## Setup

**Backend**
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

## API

`POST /convert`
```json
{
  "source_code": "// raw Selenium Java code",
  "target_language": "typescript",
  "output_directory": "output",
  "filename": "converted.spec.ts"
}
```
Returns the converted code, syntax-highlighted preview HTML, file-write status, and a log of the steps taken.

## Status

End-to-end flow (paste Java → convert → preview → save to disk) is working. The conversion engine currently uses a regex/heuristic pass; hooking up an LLM (Ollama/CodeLlama) for the refactor pass is the next step.

## Design principles

- **Readability over literal translation** — the goal is idiomatic Playwright, not a 1:1 syntax swap.
- **Graceful failure** — if conversion fails, the original code is returned commented-out with an error message rather than a blank result.
