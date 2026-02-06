# gemini.md - Project Constitution

## Data Schemas

### Core Domain: Conversion
**1. Input Object (The Request)**
```json
{
  "source_code": "String (The raw Selenium Java/TestNG code)",
  "target_language": "String ('typescript' | 'javascript')",
  "output_directory": "String (Path to write the file locally, optional)",
  "filename": "String (Desired output filename)"
}
```

**2. Output Object (The Payload)**
```json
{
  "converted_code": "String (The resulting Playwright code)",
  "preview_html": "String (Syntax highlighted HTML for UI display)",
  "file_status": "String ('written' | 'skipped' | 'error')",
  "logs": ["String (List of steps taken or warnings)"]
}
```

## Behavioral Rules
1. **Readability First**: Do not perform a line-by-line literal translation. Refactor the code to use Playwright idioms (e.g., `await expect` instead of `Assert.assertEquals`).
2. **Modern Syntax**: Use `async/await` and TypeScript types by default.
3. **User Interface**: The system must provide a rich, responsive UI for input/output.
4. **Persistence**: Results must be visible in the UI *and* saved to the local disk.


## Architectural Invariants
- **Protocol**: B.L.A.S.T.
- **Architecture**: A.N.T. 3-layer
- **Logic**: Deterministic, separation of concerns.
