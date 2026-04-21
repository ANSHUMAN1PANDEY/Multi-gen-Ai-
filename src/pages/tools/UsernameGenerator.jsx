import React, { useState } from 'react';
import { generateText } from '../../api/gemini';
import '../../styles/toolpages.css';

const UsernameGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      alert("Please provide a keyword or name.");
      return;
    }
    
    setIsGenerating(true);
    setResult('');
    setError(null);

    const systemInstruction = "You are a creative naming expert. Generate a list of 5 to 10 unique, catchy, and modern usernames based on the provided keyword or name. Provide a diverse mix (e.g., gamer style, tech style, aesthetic style). Output them as a bulleted list.";
    
    try {
      const responseText = await generateText(`Generate usernames for: ${keyword}`, systemInstruction);
      setResult(responseText);
    } catch (err) {
      if (err.message && err.message.includes("Server is busy")) {
        setResult("- TechDemoNinja\n- Shadow" + keyword + "\n- CyberWizard\n- (Fallback Demo Output) Please try again.");
      }
      setError(err.message || 'Failed to generate usernames. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-page-container animate-fade-in">
      <div className="tool-header">
        <h1><span className="gradient-text">👤 Username Generator</span></h1>
        <p>Get unique and catchy usernames for gaming, tech, social media, and more.</p>
      </div>

      <div className="tool-workspace">
        <div className="tool-panel">
          <div className="panel-title">Keyword or Name</div>
          <input 
            type="text"
            className="input-textarea"
            placeholder="e.g. Shadow, Alex, TechWizard..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ minHeight: '50px', padding: '12px' }}
          />
          
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !keyword.trim()}
            style={{ opacity: isGenerating ? 0.7 : 1, marginTop: '1rem' }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div> Generating...
              </span>
            ) : 'Generate Usernames'}
          </button>
        </div>

        <div className="tool-panel">
          <div className="panel-title">
            Generated Usernames
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
                <p>Brainstorming...</p>
              </div>
            ) : result ? (
              <div className="output-text animate-fade-in" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {result}
              </div>
            ) : (
              <div className="output-placeholder">
                <span style={{ fontSize: '3rem' }}>✨</span>
                <p>Username ideas will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameGenerator;
