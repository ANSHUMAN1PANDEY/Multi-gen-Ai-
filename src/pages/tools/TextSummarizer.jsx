import React, { useState } from 'react';
import { generateText } from '../../api/gemini';
import '../../styles/toolpages.css';

const TextSummarizer = () => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("Please provide some text to summarize.");
      return;
    }
    
    setIsGenerating(true);
    setResult('');
    setError(null);

    const systemInstruction = "You are an expert summarizer. Summarize the user's text into concise, easy-to-read bullet points. Do not include introductory text like 'Here is the summary'.";

    try {
      const summaryText = await generateText(text, systemInstruction);
      
      // Simulate typing effect for the result
      let i = 0;
      setIsGenerating(false);
      
      const interval = setInterval(() => {
        setResult((prev) => prev + summaryText.charAt(i));
        i++;
        if (i >= summaryText.length) clearInterval(interval);
      }, 15);

    } catch (err) {
      if (err.message && err.message.includes("Server is busy")) {
        setResult("• This is a fallback summary.\n• The server is currently too busy to read your long text.\n• Please try again later!");
      }
      setError(err.message || 'Failed to generate summary');
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-page-container animate-fade-in">
      <div className="tool-header">
        <h1><span className="gradient-text">📝 Text Summarizer</span></h1>
        <p>Paste long articles or documents to get concise, easy-to-read bullet points.</p>
      </div>

      <div className="tool-workspace">
        <div className="tool-panel">
          <div className="panel-title">Original Text</div>
          <textarea 
            className="input-textarea"
            placeholder="Paste your long text here (e.g., meeting notes, long articles)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
            style={{ opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div> Analyzing Text...
              </span>
            ) : 'Summarize Text'}
          </button>
        </div>

        <div className="tool-panel">
          <div className="panel-title">
            Summary Output
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
              <div className="output-placeholder" style={{color: '#ef4444', margin: 'auto'}}>
                <span style={{ fontSize: '3rem' }}>⚠️</span>
                <p style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
                {result && (
                  <div className="output-text animate-fade-in" style={{ color: 'var(--text-primary)', textAlign: 'left', whiteSpace: 'pre-wrap', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', width: '100%' }}>
                    {result}
                  </div>
                )}
              </div>
            ) : result ? (
              <div className="output-text">{result}</div>
            ) : (
              <div className="output-placeholder">
                <span style={{ fontSize: '3rem' }}>📄</span>
                <p>AI Summary will be generated here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizer;
