# Findings

## Research
- **Architecture**: A generic "script" is insufficient because the user demands a UI. We will use a **Client-Server** model.
    - **Frontend**: React + Tailwind (via Vite) for the "stunning" UI.
    - **Backend**: Python (FastAPI) to handle file operations and the conversion logic.
- **Conversion Strategy**: **Ollama with CodeLlama**. The user explicitly requested this local LLM. We will replace the regex heuristic with an API call to `http://localhost:11434`.
    - **Model**: `codellama` (Must verify if pulled).


## Discoveries
- User prioritizes "readability" over strict execution parity. This gives us license to refactor obsolete Selenium patterns (like `Thread.sleep`) into Playwright auto-waits.


## Constraints
(To be populated)
