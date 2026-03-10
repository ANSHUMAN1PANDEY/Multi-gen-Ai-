import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

// Public pages
import Home from './pages/Home.jsx';
import Tools from './pages/Tools.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

// Dashboard Tool Pages
import DashboardOverview from './pages/Dashboard.jsx';
import EmojiConverter from './pages/tools/EmojiConverter.jsx';
import TextSummarizer from './pages/tools/TextSummarizer.jsx';
import Translator from './pages/tools/Translator.jsx';
import ChatBot from './pages/tools/ChatBot.jsx';
import AIWriter from './pages/tools/AIWriter.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Sub-routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="emoji-converter" element={<EmojiConverter />} />
              <Route path="text-summarizer" element={<TextSummarizer />} />
              <Route path="translator" element={<Translator />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="ai-writer" element={<AIWriter />} />
            </Route>
          </Routes>
        </main>
        
        {/* We only render Footer for paths outside the Dashboard if we want a full vertical sidebar, 
            but keeping it inside app-container usually works fine. 
            For a more accurate internal dashboard feel, let's keep it generally visible at the bottom.
        */}
        <Routes>
          <Route path="/dashboard/*" element={null} />  {/* Hide footer on Dashboard routes for a full-height app look */}
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
