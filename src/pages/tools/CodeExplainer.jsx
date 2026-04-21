import React, { useState } from 'react';
import { generateText } from '../../api/gemini';
import '../../styles/toolpages.css';

const CodeExplainer = () => {
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!code.trim()) {
      alert("Please provide a code snippet.");
      return;
    }
    
    setIsGenerating(true);
    setResult('');
    setError(null);

    const systemInstruction = "You are a senior developer who is great at mentoring. Explain the following code snippet simply and clearly, step-by-step. Identify the language if possible.";
    
    try {
      const responseText = await generateText(`Explain this code:\n\n${code}`, systemInstruction);
      setResult(responseText);
    } catch (err) {
      if (err.message && err.message.includes("Server is busy")) {
        setResult("1. **Initialization:** The code snippet begins by setting up the environment... \n\n(Fallback Demo Explanation)\n\nNormally I would break down your specific code line-by-line, but the server is currently under maintenance. Please try again shortly.");
      }
      setError(err.message || 'Failed to explain code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-page-container animate-fade-in">
      <div className="tool-header">
        <h1><span className="gradient-text">💻 Code Explainer</span></h1>
        <p>Paste any code snippet in JavaScript, Python, or others, and get a simple explanation of what it does.</p>
      </div>

      <div className="tool-workspace">
        <div className="tool-panel">
          <div className="panel-title">Code Snippet</div>
          <textarea 
            className="input-textarea"
            placeholder="function add(a, b) {\n  return a + b;\n}"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ fontFamily: 'monospace' }}
          ></textarea>
          
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !code.trim()}
            style={{ opacity: isGenerating ? 0.7 : 1, marginTop: '1rem' }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div> Explaining...
              </span>
            ) : 'Explain Code'}
          </button>
        </div>

        <div className="tool-panel">
          <div className="panel-title">
            Explanation
            {(result || error) && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  Retry
                </button>
                {result && (
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                    onClick={() => navigator.clipboard.writeText(result)}
                  >
                    Copy Output
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="output-area">
            {error ? (
              <div className="output-placeholder" style={{color: '#ef4444'}}>
                <span style={{ fontSize: '3rem' }}>⚠️</span>
                <p style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
                {result && (
                  <div className="output-text animate-fade-in" style={{ color: 'var(--text-primary)', textAlign: 'left', whiteSpace: 'pre-wrap', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', width: '100%' }}>
                    {result}
                  </div>
                )}
              </div>
            ) : isGenerating ? (
              <div className="output-placeholder">
                <div className="spinner" style={{ width: '40px', height: '40px', borderColor: 'var(--accent-color)', borderTopColor: 'transparent' }}></div>
                <p>Analyzing code...</p>
              </div>
            ) : result ? (
              <div className="output-text animate-fade-in" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {result}
              </div>
            ) : (
              <div className="output-placeholder">
                <span style={{ fontSize: '3rem' }}>✨</span>
                <p>Code explanation will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplainer;
