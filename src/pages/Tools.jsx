import React from 'react';
import ToolCard from '../components/ToolCard.jsx';
import '../styles/tools.css';

const Tools = () => {
  const toolsList = [
    {
      id: 'image-generator',
      icon: '🖼️',
      title: 'Image Generator',
      description: 'Create stunning images from text descriptions using advanced AI generation.',
      path: '/tools/image-generator'
    },
    {
      id: 'text-summarizer',
      icon: '📝',
      title: 'Text Summarizer',
      description: 'Condense long articles and documents into concise, easy-to-read summaries.',
      path: '/tools/text-summarizer'
    },
    {
      id: 'translator',
      icon: '🌍',
      title: 'AI Translator',
      description: 'Translate text seamlessly between languages with native phrasing.',
      path: '/tools/translator'
    },
    {
      id: 'chatbot',
      icon: '💬',
      title: 'AI Assistant Chat',
      description: 'Engage in natural conversations to solve complex problems or brainstorm ideas.',
      path: '/tools/chatbot'
    }
  ];

  return (
    <div className="tools-container animate-fade-in">
      <div className="tools-header">
        <h1>AI <span className="gradient-text">Toolkit</span></h1>
        <p>Select a tool below to experience the power of MULTI GEN AI.</p>
      </div>

      <div className="tools-grid">
        {toolsList.map((tool) => (
          <ToolCard 
            key={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            path={tool.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Tools;
