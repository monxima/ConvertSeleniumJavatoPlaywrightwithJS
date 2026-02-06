import requests
import json
import re

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "codellama:latest"

SYSTEM_PROMPT = """
You are an expert Test Automation Engineer specializing in converting Selenium Java (TestNG) code to Playwright TypeScript.

**Rules:**
1. **Idiomatic Translation**: Do not translate line-by-line. Understand the *intent* of the test and rewrite it using Playwright best practices (e.g., `await expect(locator).toBeVisible()` instead of `Assert.assertTrue(element.isDisplayed())`).
2. **Syntax**: Use strictly `async/await` and TypeScript.
3. **Structure**: 
   - `public class` -> `test.describe('ClassName', ...)`
   - `@Test void method()` -> `test('methodName', async ({ page }) => ...)`
   - `driver.get()` -> `await page.goto()`
4. **Output Only**: Return ONLY the converted code. Do not wrap it in markdown block quotes (```) or add explanations. Just the raw code.
"""

def clean_response(text: str) -> str:
    """Removes markdown fencing if the LLM adds it."""
    # Remove ```typescript or ``` at start
    text = re.sub(r'^```\w*\n', '', text)
    # Remove ``` at end
    text = re.sub(r'\n```$', '', text)
    return text.strip()

def main(source_code: str, target_language: str = 'typescript') -> str:
    print(f"Converting using Ollama ({MODEL_NAME})...")
    
    prompt = f"Convert the following Selenium Java code to Playwright {target_language}:\n\n{source_code}"
    
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "system": SYSTEM_PROMPT,
        "stream": False
    }
    
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        
        result = response.json()
        converted_code = clean_response(result.get("response", ""))
        
        # Add imports if missing (sometimes LLM misses context)
        if "import { test" not in converted_code:
            converted_code = "import { test, expect } from '@playwright/test';\n\n" + converted_code
            
        return converted_code
        
    except Exception as e:
        return f"// Error calling Ollama: {str(e)}\n// Please ensure Ollama is running and '{MODEL_NAME}' is pulled.\n// Original Code:\n/*\n{source_code}\n*/"

if __name__ == "__main__":
    # Test stub
    sample_java = """
    public class LoginTest {
        @Test
        public void testLogin() {
            driver.get("https://example.com");
            Assert.assertEquals(driver.getTitle(), "Example Domain");
        }
    }
    """
    print(main(sample_java))
