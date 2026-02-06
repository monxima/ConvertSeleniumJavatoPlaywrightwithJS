# SOP: flow_conversion.md

## Purpose
This SOP defines how a raw Selenium Java string is converted into a Playwright TypeScript file.

## Flow Steps
1. **Receive Input**: The system receives `source_code`, `target_language`, and `output_directory`.
2. **Pre-Processing**:
    - Clean whitespace.
    - Identify key Selenium patterns (e.g., `By.id`, `WebDriver`, `@Test`).
3. **Conversion Engine (Layer 3)**:
    - PASS 1: Regex replacement for common imports and easy syntax (e.g., `Thread.sleep` -> `await page.waitForTimeout`).
    - PASS 2 (LLM): Refactor logic using the prompt: "Convert this Selenium Java methods to idiomatic Playwright TS." -> **For now, we will use a dummy/heuristic implementation until LLM is hooked up.**
    - Returns `converted_code`.
4. **Post-Processing**:
    - Add standard Playwright imports (`import { test, expect } from '@playwright/test';`) if missing.
5. **Output**:
    - Save file to `output_directory`/`filename`.
    - Return result to UI.

## Invariants
- **Never Overwrite**: If file exists, append timestamp or error (unless "force" flag is true).
- **Graceful Failure**: If conversion fails, return the original code commented out with an error message.
