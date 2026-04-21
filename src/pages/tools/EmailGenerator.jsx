import React, { useState } from 'react';
import { generateText } from '../../api/gemini';
import '../../styles/toolpages.css';

const EmailGenerator = () => {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('formal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!purpose.trim()) {
      alert("Please provide a purpose.");
      return;
    }
    
    setIsGenerating(true);
    setResult('');
    setError(null);

    const systemInstruction = `You are a professional email assistant. Write a well-structured, clear, and concise email based on the user's purpose. The tone of the email must be ${tone}.`;
    
    try {
      const responseText = await generateText(`Write an email for the following purpose: ${purpose}`, systemInstruction);
      setResult(responseText);
    } catch (err) {
      if (err.message && err.message.includes("Server is busy")) {
        setResult("Subject: Demo Email - Server Busy\n\nDear [Name],\n\nI am writing to inform you that our servers are currently experiencing high traffic. This is a fallback demo email.\n\nBest regards,\nMULTI GEN AI Team");
      }
      setError(err.message || 'Failed to generate email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-page-container animate-fade-in">
      <div className="tool-header">
        <h1><span className="gradient-text">✉️ Email Generator</span></h1>
        <p>Draft professional or friendly emails in seconds based on your specific purpose.</p>
      </div>

      <div className="tool-workspace">
        <div className="tool-panel">
          <div className="panel-title">Email Purpose</div>
          <textarea 
            className="input-textarea"
            placeholder="e.g. Requesting a 3-day leave for personal reasons..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          ></textarea>

          <div className="panel-title" style={{ marginTop: '1rem' }}>Tone</div>
          <select 
            className="input-textarea" 
            style={{ minHeight: 'auto', padding: '10px' }}
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="formal">Formal & Professional</option>
            <option value="friendly">Friendly & Casual</option>
          </select>
          
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !purpose.trim()}
            style={{ opacity: isGenerating ? 0.7 : 1, marginTop: '1rem' }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div> Generating...
              </span>
            ) : 'Draft Email'}
          </button>
        </div>

        <div className="tool-panel">
          <div className="panel-title">
            Generated Email
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
                <p>Drafting email...</p>
              </div>
            ) : result ? (
              <div className="output-text animate-fade-in" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {result}
              </div>
            ) : (
              <div className="output-placeholder">
                <span style={{ fontSize: '3rem' }}>✨</span>
                <p>Your generated email will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
