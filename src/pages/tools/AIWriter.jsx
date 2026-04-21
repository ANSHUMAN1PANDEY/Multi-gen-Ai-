import React, { useState } from 'react';
import { generateText } from '../../api/gemini';
import '../../styles/toolpages.css';

const AIWriter = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please provide a topic.");
      return;
    }
    
    setIsGenerating(true);
    setResult('');
    setError(null);

    const systemInstruction = "You are a professional AI writer, capable of creating engaging, high-quality articles, blogs, and marketing copy. Write a well-structured article consisting of multiple paragraphs on the user's topic.";
    
    try {
      const responseText = await generateText(`Write a comprehensive article about: ${topic}`, systemInstruction);
      setResult(responseText);
    } catch (err) {
      if (err.message && err.message.includes("Server is busy")) {
        setResult("Title: The Future of " + topic + "\n\n(Fallback Demo Content)\n\nArtificial Intelligence is rapidly evolving, bringing unprecedented changes to how we live and work. Although the server is currently under maintenance, AI continues to shape our technological future.");
      }
      setError(err.message || 'Failed to generate text. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-page-container animate-fade-in">
      <div className="tool-header">
        <h1><span className="gradient-text">✍️ AI Writer</span></h1>
        <p>Generate high-quality articles, blogs, and marketing copy instantly.</p>
      </div>

      <div className="tool-workspace">
        {/* Input Panel */}
        <div className="tool-panel">
          <div className="panel-title">Topic or Idea</div>
          <textarea 
            className="input-textarea"
            placeholder="e.g. The future of artificial intelligence in healthcare..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          ></textarea>
          
          <button 
            className="btn-primary" 
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            style={{ opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div className="spinner"></div> Generating...
              </span>
            ) : 'Write Article'}
          </button>
        </div>

        {/* Output Panel */}
        <div className="tool-panel">
          <div className="panel-title">
            Generated Content
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
                <p>Drafting article...</p>
              </div>
            ) : result ? (
              <div className="output-text animate-fade-in" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {result}
              </div>
            ) : (
              <div className="output-placeholder">
                <span style={{ fontSize: '3rem' }}>✨</span>
                <p>Your generated article will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWriter;
