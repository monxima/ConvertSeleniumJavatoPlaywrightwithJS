import { useState } from 'react';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleConvert = async () => {
    setIsLoading(true);
    setStatus('Processing...');

    try {
      const response = await fetch('http://localhost:8000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: inputCode,
          target_language: 'typescript',
          output_directory: 'output',
          filename: 'converted.spec.ts'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOutputCode(data.converted_code);
        setStatus(`Saved to: ${data.file_path}`);
      } else {
        setStatus(`Error: ${data.detail}`);
      }
    } catch (error) {
      setStatus(`Network Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight">B.L.A.S.T. Converter</h1>
        </div>
        <div className="text-sm text-slate-400">Selenium Java → Playwright TS</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Left Pane: Input */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Source (Java)</span>
          </div>
          <textarea
            className="flex-1 resize-none bg-slate-900 p-4 text-sm font-mono text-slate-300 focus:outline-none"
            placeholder="// Paste Selenium Java code here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          ></textarea>
        </div>

        {/* Center Actions */}
        <div className="flex flex-col justify-center gap-4">
          <button
            onClick={handleConvert}
            disabled={isLoading || !inputCode}
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all ${isLoading || !inputCode
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/20 hover:scale-110'
              }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            )}
          </button>
        </div>

        {/* Right Pane: Output */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Target (Playwright)</span>
            {status && (
              <span className={`text-xs ${status.includes('Error') ? 'text-red-400' : 'text-teal-400'}`}>
                {status}
              </span>
            )}
          </div>
          <textarea
            readOnly
            className="flex-1 resize-none bg-slate-900 p-4 text-sm font-mono text-teal-300 focus:outline-none"
            placeholder="// Converted code will appear here..."
            value={outputCode}
          ></textarea>

          {/* Overlay for aesthetic */}
          {!outputCode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-2 bg-slate-950 border-t border-slate-800/50 text-xs text-slate-600 flex justify-center">
        <span>Powered by B.L.A.S.T. Protocol • Local LLM: CodeLlama</span>
      </footer>
    </div>
  );
}

export default App;
